"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faArrowRight,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";
import "./d.css";
import chatbotImg from "./chatbotImg.png";
import Image from "next/image";

import Question from "../components/Question";
import Option from "../components/Option";
import {
  Reason,
  SpecificSymptom,
  ChronicCondition,
  AgeGroup,
  SubAgeGroup,
  Gender,
} from "../../types";

// Define the structure of a message
type Message = {
  role: "assistant" | "system" | "user";
  content: MessageContent[];
};

type MessageContent = TextContent | ImageContent;

type TextContent = {
  type: "text";
  text: string;
};

type ImageContent = {
  type: "image_url";
  image_url: {
    url: string;
  };
};

function ChatContainer() {
  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: [
        {
          type: "text",
          text: `Type "Start" below and click the file icon to upload your image`,
        },
      ],
    },
  ]);
  const [isSending, setIsSending] = useState(false);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const filesArray = Array.from(e.target.files);
  //     setImages((prevImages) => {
  //       // Calculate how many new images we can add
  //       const availableSlots = 5 - prevImages.length;
  //       const newImages = filesArray.slice(0, availableSlots);
  //       return [...prevImages, ...newImages];
  //     });
  //   }
  // };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Take only the first file, ignoring any additional files
      const newImage = e.target.files[0];

      // Set the images state to an array containing just this new image
      setImages([newImage]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    setIsSending(true); // Disable send and upload buttons

    // Create the content array for the new user message
    const newUserMessageContent: MessageContent[] = [
      {
        type: "text" as const,
        text: message,
      },
      ...images.map((file) => ({
        type: "image_url" as const,
        // Temporary URLs for rendering - will be replaced by the backend response
        image_url: { url: URL.createObjectURL(file) },
      })),
    ];

    // Create a new user message object
    const newUserMessage: Message = {
      role: "user",
      content: newUserMessageContent as (TextContent | ImageContent)[],
    };

    // Update the messages state to include the new user message
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // Convert images to base64 strings for the backend
    const imagePromises: any = images.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

    const imageBase64Strings = await Promise.all(imagePromises);

    // Construct the payload with base64 strings
    const payload = {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: message },
            ...imageBase64Strings.map((base64) => ({
              type: "image_url",
              image_url: { url: base64 },
            })),
          ],
        },
      ],
    };

    try {
      if (images.length === 0) {
        const textContentItem = payload.messages[0].content.find(
          (item) => item.type === "text"
        );

        if (textContentItem && "text" in textContentItem) {
          const textMessage = textContentItem.text;
          const response = await axios.post(
            "/api/openai",
            {
              messages: [
                {
                  role: "user",
                  content: [
                    {
                      type: "text",
                      text: textMessage, // Ensure textMessage is defined and contains the message you want to send
                    },
                  ],
                },
              ],
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const result = await response.data;
          const finalRes = result.message.content;
          console.log(finalRes);
          const newMessage: Message = {
            // Explicitly declaring newMessage as type Message
            role: "system",
            content: [{ type: "text", text: finalRes }],
          };

          setMessages((prevMessages: Message[]) => [
            ...prevMessages,
            newMessage as Message,
          ]); // Type assertion here
        }
      } else {
        const Imgpayload = {
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text:
                    "Analyze image and try to find the possible disease." +
                    message,
                },
                ...imageBase64Strings.map((base64) => ({
                  type: "image_url",
                  image_url: { url: base64 },
                })),
              ],
            },
          ],
        };
        // Send the message to the backend
        const response1 = await axios.post("/api/openai", Imgpayload);

        if (!response1.data.success) {
          toast.error(response1.data.error);
        }

        const textMessage = { ...response1.data.message };

        const newMessage: Message = {
          role: "system",
          content: [{ type: "text", text: textMessage }],
        };

        setMessages((prevMessages: Message[]) => [
          ...prevMessages,
          newMessage as Message,
        ]); // Type assertion here
      }
    } catch (error) {
      toast.error("Failed to send message");
      // Optionally remove the user message if sending fails or handle the error as needed
    } finally {
      // Clear the message and images state, regardless of whether the send was successful
      setMessage("");
      setImages([]);
      setIsSending(false); // Re-enable send and upload buttons
    }
  };

  function formatMessage(content: string) {
    content = String(content);
    content = content.replace(/\*\*/g, "");
    // First, replace Markdown links with <a> tags
    const markdownLinkRegex = /\[([^\]]+)]\((http[^)]+)\)/g;
    content = content.replace(markdownLinkRegex, (match, text, url) => {
      return `<a href="${url.trim()}" target="_blank" style="text-decoration: none; color: #007bff;">${text}</a>`;
    });

    // Then, replace plain URLs with <a> tags, but only those not already part of an <a> tag
    const urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
    content = content.replace(urlRegex, (url) => {
      // Avoid replacing URLs in already processed Markdown links
      const precedingText = content.substring(0, content.indexOf(url));
      if (!precedingText.endsWith('href="')) {
        return `<a href="${url.trim()}" target="_blank" style="text-decoration: none; color: #007bff;">${url.trim()}</a>`;
      } else {
        return url; // Return the original URL if it's already part of an <a> tag
      }
    });

    return `<pre style="white-space: pre-wrap;">${content}</pre>`;
  }

  // form related questions
  const [step, setStep] = useState<number>(1);
  const [reason, setReason] = useState<Reason | "">("");
  const [specificSymptom, setSpecificSymptom] = useState<SpecificSymptom | "">(
    ""
  );
  const [ageGroup, setAgeGroup] = useState<AgeGroup | "">("");
  const [subAgeGroup, setSubAgeGroup] = useState<SubAgeGroup | "">("");
  const [gender, setGender] = useState<Gender | "">("");

  const handleSelectReason = (selectedReason: Reason) => {
    setReason(selectedReason);
    // Assuming "Specific Symptoms" needs a follow-up, otherwise skip to the age question
    const nextStep = selectedReason === "Specific Symptoms" ? 2 : 3;
    setStep(nextStep);
  };

  const handleSelectSpecificSymptom = (symptom: SpecificSymptom) => {
    setSpecificSymptom(symptom);
    setStep(3); 
  };

  const handleSelectAgeGroup = (age: AgeGroup) => {
    setAgeGroup(age);
    if (age === "Under 18") {
      setStep(4);
    } else {
      setStep(5); 
    }
  };

  const handleSelectSubAgeGroup = (subAge: SubAgeGroup) => {
    setSubAgeGroup(subAge);
    setStep(5);
  };


  const handleSelectGender = (selectedGender: Gender) => {
    setGender(selectedGender);
    setStep(6);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-green max-h-[56px] h-full flex items-center pl-2 pt-1 pb-1">
        <Image
          src={chatbotImg}
          className="w-auto max-w-[106px] h-full rounded-full border border-white mr-2 bg-white"
          alt="Avatar"
        />
        <h2 className="text-white text-lg">Ask Inteliflora</h2>
      </div>

      <div className="max-w-4xl px-2 py-4">
    {step === 1 && (
      <>
        <Question text="Hi! I'm Flora, your AI guide here to assist you in discovering the perfect herbal formula tailored to your unique health needs. Before we get started, could you tell me a bit about what brought you here today?" />
        <Option onClick={() => handleSelectReason("General Health and Wellbeing")}>General Health and Wellbeing</Option>
        <Option onClick={() => handleSelectReason("Specific Symptoms")}>Specific Symptoms</Option>
        <Option onClick={() => handleSelectReason("Chronic Condition Management")}>Chronic Condition Management</Option>
        <Option onClick={() => handleSelectReason("Preventive Care")}>Preventive Care</Option>
        <Option onClick={() => handleSelectReason("Lifestyle Improvement")}>Lifestyle Improvement</Option>
        <Option onClick={() => handleSelectReason("Reproductive Health")}>Reproductive Health</Option>
        <Option onClick={() => handleSelectReason("Other")}>Other</Option>
      </>
    )}

    {step === 2 && reason === "Specific Symptoms" && (
      <>
        <Question text="Please select your specific symptoms." />
        <Option onClick={() => handleSelectSpecificSymptom("Pain")}>Pain</Option>
        <Option onClick={() => handleSelectSpecificSymptom("Fatigue")}>Fatigue</Option>
        <Option onClick={() => handleSelectSpecificSymptom("Fever")}>Fever</Option>
        <Option onClick={() => handleSelectSpecificSymptom("Digestive issues")}>Digestive issues</Option>
        <Option onClick={() => handleSelectSpecificSymptom("Mental health concerns")}>Mental health concerns</Option>
        <Option onClick={() => handleSelectSpecificSymptom("Skin concerns")}>Skin concerns</Option>
      </>
    )}

    {step === 3 && (
      <>
        <Question text="Please select the age range that best represents you." />
        <Option onClick={() => handleSelectAgeGroup("Under 18")}>Under 18</Option>
        <Option onClick={() => handleSelectAgeGroup("18-24")}>18-24</Option>
        <Option onClick={() => handleSelectAgeGroup("25-34")}>25-34</Option>
        <Option onClick={() => handleSelectAgeGroup("35-44")}>35-44</Option>
        <Option onClick={() => handleSelectAgeGroup("45-54")}>45-54</Option>
        <Option onClick={() => handleSelectAgeGroup("55-64")}>55-64</Option>
        <Option onClick={() => handleSelectAgeGroup("65 and older")}>65 and older</Option>
      </>
    )}

    {step === 4 && ageGroup === "Under 18" && (
      <>
        <Question text="Please select a more specific age range." />
        <Option onClick={() => handleSelectSubAgeGroup("0-2 years")}>0-2 years</Option>
        <Option onClick={() => handleSelectSubAgeGroup("3-5 years")}>3-5 years</Option>
        <Option onClick={() => handleSelectSubAgeGroup("6-10 years")}>6-10 years</Option>
        <Option onClick={() => handleSelectSubAgeGroup("11-13 years")}>11-13 years</Option>
        <Option onClick={() => handleSelectSubAgeGroup("14-17 years")}>14-17 years</Option>
      </>
    )}

    {step === 5 && (
      <>
        <Question text="What is your gender identity?" />
        <Option onClick={() => handleSelectGender("Male")}>Male</Option>
        <Option onClick={() => handleSelectGender("Female")}>Female</Option>
        <Option onClick={() => handleSelectGender("Non-binary")}>Non-binary</Option>
        <Option onClick={() => handleSelectGender("Prefer to self-describe")}>Prefer to self-describe</Option>
        <Option onClick={() => handleSelectGender("Prefer not to say")}>Prefer not to say</Option>
      </>
    )}

    {step === 6 && (
      <>
        <Question text="Thank you for completing the questionnaire. We will now assist you with personalized herbal formula recommendations." />
        {/* Here, you could add a call to action or navigation to another page */}
      </>
    )}
  </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`flex mb-4 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg p-2 max-w-xs md:max-w-xl ${
                message.role === "user"
                  ? "bg-green text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {/* Ensure that content is an array before mapping */}
              {Array.isArray(message.content) ? (
                message.content.map((content, index) => {
                  if (content.type === "text") {
                    return (
                      <pre
                        key={index}
                        dangerouslySetInnerHTML={{
                          __html: formatMessage(content.text),
                        }}
                      />
                    );
                  } else if (content.type === "image_url") {
                    return (
                      <img
                        key={index}
                        src={content.image_url.url}
                        alt={`Uploaded by ${message.role}`}
                        className="h-16 w-16 object-cover rounded-lg"
                      />
                    );
                  }
                })
              ) : (
                // If message.content is not an array, render it as a string
                <p>{message.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4">
        {images.length > 0 && (
          <div className="relative inline-block">
            <img
              src={URL.createObjectURL(images[0])}
              alt="upload-preview"
              className="h-16 w-16 object-cover rounded-lg mr-2"
            />
            <button
              onClick={() => removeImage(0)} // Adjusted to always remove the first image
              className="w-5 h-5 absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs"
            >
              &times;
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 py-4 px-2 bg-white">
        <label className="flex justify-center items-center p-2 rounded-full bg-gray-200 text-gray-500 w-10 h-10 cursor-pointer">
          <FontAwesomeIcon icon={faPaperclip} className="h-5 w-5" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={isSending}
          />
        </label>
        <textarea
          className="flex-1 border-solid border border-gray-600 rounded-md p-2 bg-gray-200 text-gray-800 outline-none focus:outline-none"
          placeholder="Type your message here..."
          rows={1}
          value={message}
          onChange={handleMessageChange}
        ></textarea>
        <button
          className="flex justify-center items-center p-2 rounded-full bg-green text-white w-10 h-10"
          onClick={sendMessage}
          disabled={isSending}
        >
          {isSending ? (
            <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 fa-spin" />
          ) : (
            <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}

export default ChatContainer;

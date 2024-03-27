"use client";

import React, { useState, useEffect, useRef } from "react";
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
  SpecificPain,
  AgeGroup,
  Gender,
  HeadacheLocation,
  HeadacheSevere,
  JointSevere,
  MuscleTrigger,
  AbdominalLocation,
  AbdominalSevere,
  ChestSevere,
  ChestTrigger,
  BackLocation,
  BackSevere,
  MentalState,
  Energy,
  Sleep,
  Diet,
  Medications,
  Food,
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
  // form related questions
  const [userFlow, setUserFlow] = useState<
    Array<{ question: string; answer: string }>
  >([]);
  const [step, setStep] = useState<number>(0);
  const [reason, setReason] = useState<Reason | "">("");
  const [Q13, setQ13] = useState<string>("");
  const [specificSymptom, setSpecificSymptom] = useState<SpecificSymptom | "">(
    ""
  );
  const [specificPain, setSpecificPain] = useState<SpecificPain | "">("");
  const [hl, setHl] = useState<HeadacheLocation | "">("");
  const [hs, setHs] = useState<HeadacheSevere | "">("");
  const [js, setJs] = useState<JointSevere | "">("");
  const [mt, setMt] = useState<MuscleTrigger | "">("");
  const [al, setAl] = useState<AbdominalLocation | "">("");
  const [as, setAs] = useState<AbdominalSevere | "">("");
  const [ct, setCt] = useState<ChestTrigger | "">("");
  const [cs, setCs] = useState<ChestSevere | "">("");
  const [bl, setBl] = useState<BackLocation | "">("");
  const [bs, setBs] = useState<BackSevere | "">("");

  const [ageGroup, setAgeGroup] = useState<AgeGroup | "">("");
  const [gender, setGender] = useState<Gender | "">("");
  const [mentalState, setMentalState] = useState<MentalState | "">("");
  const [energy, setEnergy] = useState<Energy | "">("");
  const [sleep, setSleep] = useState<Sleep | "">("");
  const [diet, setDiet] = useState<Diet | "">("");
  const [medications, setMedications] = useState<Medications | "">("");
  const [food, setFood] = useState<Food | "">("");

  const [otherQ1, setOtherQ1] = useState<string>(""); //q1 other
  const [otherQ171, setOtherQ171] = useState<string>(""); //q171 other
  const [otherQ12, setOtherQ12] = useState<string>(""); //q12 other
  const [otherQ41, setOtherQ41] = useState<string>(""); //q41 other
  const [otherQ61, setOtherQ61] = useState<string>(""); //q61 other
  const [otherQ711, setOtherQ711] = useState<string>(""); //q711 other
  const [otherQ81, setOtherQ81] = useState<string>(""); //q81 other

  const [Q133, setQ133] = useState<string>("");
  const [Q144, setQ144] = useState<string>("");
  const [Q155, setQ155] = useState<string>("");
  const [Q166, setQ166] = useState<string>("");
  const [Q177, setQ177] = useState<string>("");
  const [Q188, setQ188] = useState<string>("");

  const [finalQuestion, setFinalQuestion] = useState<string>("");
  const [otherFinal, setOtherFinal] = useState<string>("");

  const handleSelectOk = () => {
    setStep(1);
  };

  const handleSelectReason = (selectedReason: Reason) => {
    setReason(selectedReason);
    if (selectedReason === "Other") {
      setStep(1.2);
    } else {
      setUserFlow((prevFlow) => [
        ...prevFlow,
        {
          question:
            "Before we get started, could you tell me a bit about what brought you here today?",
          answer: selectedReason,
        },
      ]);

      switch (selectedReason) {
        case "Address specific health issues":
          setStep(1.1);
          break;
        case "Support recovery from an illness or injury":
          setStep(1.3);
          break;
        default:
          setStep(2);
      }
    }
  };

  const handleQ13Submit = () => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Please tell me more about your Illness or Injury",
        answer: Q13.trim(),
      },
    ]);
    if (Q13.trim() !== "") {
      setStep(2);
    }
  };

  const handleSelectSpecificSymptom = (symptom: SpecificSymptom) => {
    setSpecificSymptom(symptom);
    if (symptom !== "Other")
      setUserFlow((prevFlow) => [
        ...prevFlow,
        {
          question: "Please select your primary health issue",
          answer: symptom,
        },
      ]);
    switch (symptom) {
      case "Pain or discomfort":
        setStep(1.11);
        break;
      case "Other":
        setStep(1.12);
        break;
      case "Digestive issues":
        setStep(1.13);
        break;
      case "Sleep disturbances":
        setStep(1.14);
        break;
      case "Emotional or mental health concerns":
        setStep(1.15);
        break;
      case "Energy level concerns":
        setStep(1.16);
        break;
      case "Skin conditions":
        setStep(1.17);
        break;
      case "Respiratory issues":
        setStep(1.18);
        break;
      default:
        setStep(2);
    }
  };

  const handleQ133Submit = () => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Please tell me more about your digestive issues",
        answer: Q133.trim(),
      },
    ]);
    if (Q133.trim() !== "") {
      setStep(2);
    }
  };
  const handleQ144Submit = () => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Please tell me more about your Sleep Disturbances",
        answer: Q144.trim(),
      },
    ]);
    if (Q144.trim() !== "") {
      setStep(2);
    }
  };
  const handleQ155Submit = () => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question:
          "Please tell me more about your Emotional or mental health concerns",
        answer: Q155.trim(),
      },
    ]);
    if (Q155.trim() !== "") {
      setStep(2);
    }
  };
  const handleQ166Submit = () => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Please tell me more about your Energy Level concerns",
        answer: Q166.trim(),
      },
    ]);
    if (Q166.trim() !== "") {
      setStep(2);
    }
  };
  const handleQ177Submit = () => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Please tell me more about your Skin Condition concerns",
        answer: Q177.trim(),
      },
    ]);
    if (Q177.trim() !== "") {
      setStep(2);
    }
  };
  const handleQ188Submit = () => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Please tell me more about your Respiratory concerns",
        answer: Q188.trim(),
      },
    ]);
    if (Q188.trim() !== "") {
      setStep(2);
    }
  };

  const handleSelectSpecificPain = (pain: SpecificPain) => {
    setSpecificPain(pain);

    if (pain !== "Other") {
      setUserFlow((prevFlow) => [
        ...prevFlow,
        {
          question:
            "Do you have any specific pain or discomfort? If yes, please select the type that best describes your condition:",
          answer: pain,
        },
      ]);
    }

    switch (pain) {
      case "Headache":
        setStep(1.111);
        break;
      case "Joint pain":
        setStep(1.121);
        break;
      case "Muscle ache":
        setStep(1.131);
        break;
      case "Abdominal pain":
        setStep(1.141);
        break;
      case "Chest discomfort":
        setStep(1.151);
        break;
      case "Back pain":
        setStep(1.161);
        break;
      case "Other":
        setStep(1.171);
        break;
      default:
        setStep(2);
    }
    // setStep(3);
  };

  const handleSelectHl = (hl: HeadacheLocation) => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Where is your headache primarily located?",
        answer: hl,
      },
    ]);
    setHl(hl);
    setStep(1.112);
  };

  const handleSelectHs = (hs: HeadacheSevere) => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "How would you describe your headache?",
        answer: hs,
      },
    ]);
    setHs(hs);
    setStep(2);
  };

  // multiselect option start
  const [selectedJointOptions, setSelectedJointOptions] = useState<string[]>(
    []
  );
  const handleSelectSpecificJoint = (option: string) => {
    setSelectedJointOptions((currentOptions) => {
      if (currentOptions.includes(option)) {
        // If the option is already selected, remove it
        return currentOptions.filter(
          (currentOption) => currentOption !== option
        );
      } else {
        // Otherwise, add the option to the selected list
        return [...currentOptions, option];
      }
    });
    const optionsString = selectedJointOptions.join(", ");
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Which joints are affected?",
        answer: optionsString,
      },
    ]);
  };
  const handleJointNext = () => {
    setStep(1.122);
  };
  // multiselect option end

  const handleSelectJs = (js: JointSevere) => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "How would you describe the pain in your joints?",
        answer: js,
      },
    ]);
    setJs(js);
    setStep(2);
  };

  // multiselect option start
  const [selectedMuscleOptions, setSelectedMuscleOptions] = useState<string[]>(
    []
  );
  const handleSelectSpecificMuscle = (option: string) => {
    setSelectedMuscleOptions((currentOptions) => {
      if (currentOptions.includes(option)) {
        // If the option is already selected, remove it
        return currentOptions.filter(
          (currentOption) => currentOption !== option
        );
      } else {
        // Otherwise, add the option to the selected list
        return [...currentOptions, option];
      }
    });
    const optionsString = selectedMuscleOptions.join(", ");
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Where is the muscle ache located?",
        answer: optionsString,
      },
    ]);
  };
  const handleMuscleNext = () => {
    setStep(1.132);
  };
  // multiselect option end

  const handleSelectMt = (mt: MuscleTrigger) => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "What triggers your muscle ache?",
        answer: mt,
      },
    ]);
    setMt(mt);
    setStep(2);
  };

  const handleSelectAl = (al: AbdominalLocation) => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Can you pinpoint where the abdominal pain is most intense?",
        answer: al,
      },
    ]);
    setAl(al);
    setStep(1.142);
  };

  const handleSelectAs = (as: AbdominalSevere) => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question:
          "What type of sensation do you experience with your abdominal pain?",
        answer: as,
      },
    ]);
    setAs(as);
    setStep(2);
  };

  const handleSelectCt = (ct: ChestTrigger) => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Does anything specific trigger your chest discomfort?",
        answer: ct,
      },
    ]);
    setCt(ct);
    setStep(1.151);
  };

  const handleSelectCs = (cs: ChestSevere) => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Can you describe the nature of your chest discomfort?",
        answer: cs,
      },
    ]);
    setCs(cs);
    setStep(2);
  };

  const handleSelectBl = (bl: BackLocation) => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Where is your back pain located?",
        answer: bl,
      },
    ]);
    setBl(bl);
    setStep(1.161);
  };

  const handleSelectBs = (bs: BackSevere) => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "How would you describe your back pain?",
        answer: bs,
      },
    ]);
    setBs(bs);
    setStep(2);
  };

  const handleOtherQ171Submit = () => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question:
          "Do you have any specific pain or discomfort? If yes, please select the type that best describes your condition:",
        answer: otherQ171.trim(),
      },
    ]);
    if (otherQ171.trim() !== "") {
      setStep(2);
    }
  };

  const handleOtherQ1Submit = () => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question:
          "What are your goals in seeking a personalized Traditional Chinese Medicine herbal formula?",
        answer: otherQ1.trim(),
      },
    ]);
    if (otherQ1.trim() !== "") {
      setStep(2);
    }
  };

  const handleOtherQ12Submit = () => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Please tell your primary health issue:",
        answer: otherQ12.trim(),
      },
    ]);
    if (otherQ12.trim() !== "") {
      setStep(2);
    }
  };

  const handleOtherQ41Submit = () => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Please specify your mental state",
        answer: otherQ41.trim(),
      },
    ]);
    if (otherQ41.trim() !== "") {
      setStep(5);
    }
  };

  const handleOtherQ61Submit = () => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Please specify your sleep state",
        answer: otherQ61.trim(),
      },
    ]);
    if (otherQ61.trim() !== "") {
      setStep(7);
    }
  };

  const handleOtherQ711Submit = () => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Please specify the food have you been craving?",
        answer: otherQ711.trim(),
      },
    ]);
    if (otherQ711.trim() !== "") {
      setStep(8);
    }
  };

  const handleSelectAgeGroup = (selectedAge: AgeGroup) => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Please select the age range that best represents you.",
        answer: selectedAge,
      },
    ]);
    setAgeGroup(selectedAge);
    setStep(3);
  };

  const handleSelectGender = (selectedGender: Gender) => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "What is your gender identity?",
        answer: selectedGender,
      },
    ]);
    setGender(selectedGender);
    setStep(4);
  };

  const handleSelectMental = (selectedMental: MentalState) => {
    if (selectedMental !== "Other") {
      setUserFlow((prevFlow) => [
        ...prevFlow,
        {
          question:
            "How would you describe your current mental and emotional state?",
          answer: selectedMental,
        },
      ]);
    }

    setMentalState(selectedMental);
    selectedMental === "Other" ? setStep(4.1) : setStep(5);
  };

  const handleSelectEnergy = (selectedEnergy: Energy) => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "Have you noticed any changes in your energy levels lately?",
        answer: selectedEnergy,
      },
    ]);
    setEnergy(selectedEnergy);
    setStep(6);
  };

  const handleSelectSleep = (selectedSleep: Sleep) => {
    if (selectedSleep !== "Other") {
      setUserFlow((prevFlow) => [
        ...prevFlow,
        {
          question: "How has your sleep been?",
          answer: selectedSleep,
        },
      ]);
    }
    setSleep(selectedSleep);
    selectedSleep === "Other" ? setStep(6.1) : setStep(7);
  };

  const handleSelectDiet = (selectedDiet: Diet) => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question:
          "Have there been any significant changes in your diet or appetite?",
        answer: selectedDiet,
      },
    ]);
    setDiet(selectedDiet);
    selectedDiet === "Cravings for specific foods" ? setStep(7.1) : setStep(8);
  };

  const handleSelectFood = (selectedFood: Food) => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "What type of foods have you been craving?",
        answer: selectedFood,
      },
    ]);
    setFood(selectedFood);
    selectedFood === "Other" ? setStep(7.11) : setStep(8);
  };

  const handleSelectMedications = (selectedMedications: Medications) => {
    setMedications(selectedMedications);
    selectedMedications == "Yes"
      ? setStep(8.1)
      : (setUserFlow((prevFlow) => [
          ...prevFlow,
          {
            question: "Do you take any medications regularly?",
            answer: selectedMedications,
          },
        ]),
        setStep(9));
  };

  const handleOtherQ81Submit = () => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: "What medications you take?",
        answer: otherQ81.trim(),
      },
    ]);
    if (otherQ81.trim() !== "") {
      setStep(9);
    }
  };

  const handleFinalQuestion = (option: string) => {
    setFinalQuestion(option);
    option == "Yes, there's more to share about my health"
      ? setStep(9.1)
      : setStep(10);
  };

  const handleOtherFinalSubmit = () => {
    setUserFlow((prevFlow) => [
      ...prevFlow,
      {
        question: `As we approach the final step, it's important we consider all aspects of your well-being.
        Are there any other health concerns or details you feel would be helpful for me to know?
        This can ensure that the herbal formula I recommend is perfectly attuned to your needs. Please share anything you think is relevant—no detail is too small.`,
        answer: otherFinal.trim(),
      },
    ]);
    if (otherFinal.trim() !== "") {
      setStep(10);
    }
  };

  //form related questions end
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

  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: [
        {
          type: "text",
          text: `Hi! I’m Flora, your AI powered herbal guide. 
Ready to harness the wisdom of Traditional Chinese Medicine to boost your health. 
          
Just tap the attachment icon to take or choose a clear well-lit close up photo of your tongue. Then tap the green circle with the white arrow to send. 
          
In about 30 seconds, I’ll share some initial insights and ask a few follow up questions to craft the perfect herbal formula for you.
          
Eager for personalized health advice? Upload your Tongue Selfie now—It’s simple and fast!"
          `,
        },
      ],
    },
  ]);
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // const messagesContainerRef = useRef(null); // Add this line

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const scrollHeight = messagesEndRef.current.scrollHeight;
      const height = messagesEndRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      messagesEndRef.current.scrollTop =
        maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  // Adjust useEffect to control when scrollToBottom is called...
  useEffect(() => {
    if (!isSending) {
      scrollToBottom();
    }
  }, [isSending]); // Depend on waitingForResponse




  const fileInputRef = useRef(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Take only the first file, ignoring any additional files
      const newImage = e.target.files[0];

      // Set the images state to an array containing just this new image
      setImages([newImage]);
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const previousMessagesWithoutFirst = messages.slice(1);
  let trimmedMessagesWithImages = previousMessagesWithoutFirst.slice(-5);
  const trimmedMessages = trimmedMessagesWithImages.filter((message) => {
    // Check if every content item is NOT of type 'image_url'
    return message.content.every(
      (contentItem) => contentItem.type !== "image_url"
    );
  });

  const sendMessage = async () => {
    if (images.length > 0 || firstImgCounter != 0) {
      if (images.length > 0 || message !== "") {
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

        const urls = payload.messages.flatMap((message) =>
          message.content
            .filter(
              (item): item is { type: "image_url"; image_url: { url: any } } =>
                item.type === "image_url"
            )
            .map((item) => item.image_url.url)
        );
        setFirstImg(urls);

        try {
          console.log("executing");
          if (firstImgCounter) {
            console.log("hey fool");
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
                      ...trimmedMessages,
                      {
                        role: "user",
                        content: [
                          {
                            type: "text",
                            text: textMessage,
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
                  ...trimmedMessages,
                  {
                    role: "user",
                    content: [
                      {
                        type: "text",
                        text:
                          "Analyze image and try to find the possible disease only." +
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

              const textMessage = response1.data.message.content;

              const newMessage: Message = {
                role: "system",
                content: [{ type: "text", text: textMessage }],
              };

              setMessages((prevMessages: Message[]) => [
                ...prevMessages,
                newMessage as Message,
              ]); // Type assertion here
            }
          }
        } catch (error) {
          console.log(error);
          toast.error("Failed to send message");
          // Optionally remove the user message if sending fails or handle the error as needed
        } finally {
          // Clear the message and images state, regardless of whether the send was successful
          setMessage("");
          setImages([]);
          setIsSending(false); // Re-enable send and upload buttons
          step === 0 ? setStep(0.5) : "";
        }
      } else {
        toast.error("Please upload image or type something");
      }
    } else {
      toast.error("Please upload image to continue");
    }
  };

  const [firstImg, setFirstImg] = React.useState<string[]>([]);
  const [firstImgCounter, setFirstImgCounter] = useState(0);
  useEffect(() => {
    if (step === 10) {
      const userFlowString = userFlow
        .map((entry) => `${entry.question} Answer: ${entry.answer}`)
        .join("; ");

      const assistantMessage: Message = {
        role: "assistant",
        content: [
          {
            type: "text",
            text: `User health data is below ${userFlowString}`,
          },
        ],
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      const fetchAPI = async () => {
        try {
          const textMessage = userFlowString;
          const response = await axios.post(
            "/api/openai",
            {
              messages: [
                ...trimmedMessages,
                {
                  role: "user",
                  content: [
                    {
                      type: "text",
                      text:
                        "Analyze image and tell any possible disease along with recommended products to use. User health data is below: " +
                        textMessage,
                    },
                    {
                      type: "image_url",
                      image_url: { url: firstImg[0] },
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

          const newMessage: Message = {
            role: "system",
            content: [{ type: "text", text: finalRes }],
          };

          setMessages((prevMessages) => [...prevMessages, newMessage]);
          setStep(11);
          setFirstImgCounter(1);
        } catch (error) {
          console.error("Failed to send message", error);
        }
      };
      // Execute the async function
      fetchAPI();
    }
  }, [step, userFlow, message, images]);

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
        {step === 0.5 && (
          <>
            <Question text="Thank you for taking the first step toward optimal health with InteliFlora. Your Tongue Selfie has unlocked some intriguing insights! To further personalize your herbal blend and ensure it's the perfect fit, I'll need to ask a couple more questions. This way, we'll craft a wellness formula that's as unique as you are. Ready to fine-tune your path to vitality? Press 'Ok' to continue!" />
            {["Ok"].map((option) => (
              <Option key={option} onClick={() => handleSelectOk()}>
                {option}
              </Option>
            ))}
          </>
        )}

        {step === 1 && (
          <>
            <Question text="Before we get started, could you tell me a bit about what brought you here today?" />
            {(
              [
                "General Health and Wellbeing",
                "Address specific health issues",
                "Support recovery from an illness or injury",
                "Other",
              ] as Reason[]
            ).map((reason) => (
              <Option key={reason} onClick={() => handleSelectReason(reason)}>
                {reason}
              </Option>
            ))}
          </>
        )}

        {step === 1.3 && (
          <>
            <Question text="Please tell me more about your Illness or Injury" />
            <input
              type="text"
              value={Q13}
              onChange={(e) => setQ13(e.target.value)}
              className="my-2 border border-gray-400 rounded p-2 w-full outline-none focus:outline-none"
              placeholder="Type here..."
            />
            <Option onClick={handleQ13Submit}>Submit</Option>
          </>
        )}

        {step === 1.1 && (
          <>
            <Question text="Please select your primary health issue." />
            {(
              [
                "Pain or discomfort",
                "Digestive issues",
                "Sleep disturbances",
                "Emotional or mental health concerns",
                "Energy level concerns",
                "Skin conditions",
                "Respiratory issues",
                "Other",
              ] as SpecificSymptom[]
            ).map((symptom) => (
              <Option
                key={symptom}
                onClick={() => handleSelectSpecificSymptom(symptom)}
              >
                {symptom}
              </Option>
            ))}
          </>
        )}

        {step === 1.12 && (
          <>
            <Question text="Please describe your health issue." />
            <input
              type="text"
              value={otherQ12}
              onChange={(e) => setOtherQ12(e.target.value)}
              className="my-2 border border-gray-400 rounded p-2 w-full outline-none focus:outline-none"
              placeholder="Type here..."
            />
            <Option onClick={handleOtherQ12Submit}>Submit</Option>
          </>
        )}

        {step === 1.13 && (
          <>
            <Question text="Please tell me more about your digestive issues" />
            <input
              type="text"
              value={Q133}
              onChange={(e) => setQ133(e.target.value)}
              className="my-2 border border-gray-400 rounded p-2 w-full outline-none focus:outline-none"
              placeholder="Type here..."
            />
            <Option onClick={handleQ133Submit}>Submit</Option>
          </>
        )}

        {step === 1.14 && (
          <>
            <Question text="Please tell me more about your Sleep Disturbances" />
            <input
              type="text"
              value={Q144}
              onChange={(e) => setQ144(e.target.value)}
              className="my-2 border border-gray-400 rounded p-2 w-full outline-none focus:outline-none"
              placeholder="Type here..."
            />
            <Option onClick={handleQ144Submit}>Submit</Option>
          </>
        )}

        {step === 1.15 && (
          <>
            <Question text="Please tell me more about your Emotional or mental health concerns" />
            <input
              type="text"
              value={Q155}
              onChange={(e) => setQ155(e.target.value)}
              className="my-2 border border-gray-400 rounded p-2 w-full outline-none focus:outline-none"
              placeholder="Type here..."
            />
            <Option onClick={handleQ155Submit}>Submit</Option>
          </>
        )}

        {step === 1.16 && (
          <>
            <Question text="Please tell me more about your Energy Level concerns " />
            <input
              type="text"
              value={Q166}
              onChange={(e) => setQ166(e.target.value)}
              className="my-2 border border-gray-400 rounded p-2 w-full outline-none focus:outline-none"
              placeholder="Type here..."
            />
            <Option onClick={handleQ166Submit}>Submit</Option>
          </>
        )}

        {step === 1.17 && (
          <>
            <Question text="Please tell me more about your Skin Condition concerns" />
            <input
              type="text"
              value={Q177}
              onChange={(e) => setQ177(e.target.value)}
              className="my-2 border border-gray-400 rounded p-2 w-full outline-none focus:outline-none"
              placeholder="Type here..."
            />
            <Option onClick={handleQ177Submit}>Submit</Option>
          </>
        )}

        {step === 1.18 && (
          <>
            <Question text="Please tell me more about your Respiratory concerns" />
            <input
              type="text"
              value={Q188}
              onChange={(e) => setQ188(e.target.value)}
              className="my-2 border border-gray-400 rounded p-2 w-full outline-none focus:outline-none"
              placeholder="Type here..."
            />
            <Option onClick={handleQ188Submit}>Submit</Option>
          </>
        )}

        {step === 1.11 && (
          <>
            <Question text="Please select the type that best describes your condition." />
            {(
              [
                "Headache",
                "Joint pain",
                "Muscle ache",
                "Abdominal pain",
                "Chest discomfort",
                "Back pain",
                "None",
                "Other",
              ] as SpecificPain[]
            ).map((pain) => (
              <Option key={pain} onClick={() => handleSelectSpecificPain(pain)}>
                {pain}
              </Option>
            ))}
          </>
        )}

        {step === 1.111 && (
          <>
            <Question text="Where is your headache primarily located?" />
            {(
              [
                "Forehead",
                "Temples",
                "Top of head",
                "Back of head/neck area",
                "All over/General",
              ] as HeadacheLocation[]
            ).map((option) => (
              <Option key={option} onClick={() => handleSelectHl(option)}>
                {option}
              </Option>
            ))}
          </>
        )}

        {step === 1.112 && (
          <>
            <Question text="How would you describe your headache?" />
            {(
              [
                "Throbbing or pulsating",
                "Pressing or tightening",
                "Sharp or stabbing",
                "Constant dull ache",
              ] as HeadacheSevere[]
            ).map((option) => (
              <Option key={option} onClick={() => handleSelectHs(option)}>
                {option}
              </Option>
            ))}
          </>
        )}

        {step === 1.121 && (
          <>
            <Question text="Which joints are affected? (Select all that apply)" />
            {[
              "Hands or wrists",
              "Knees",
              "Elbows",
              "Shoulders",
              "Hips",
              "Ankles or feet",
            ].map((option) => (
              <Option
                key={option}
                onClick={() => handleSelectSpecificJoint(option)}
                isSelected={selectedJointOptions.includes(option)}
              >
                {option}
              </Option>
            ))}
            <br></br>
            <button
              className="mt-4 text-sm border py-2 px-6 rounded bg-green text-white "
              onClick={handleJointNext}
            >
              Next
            </button>
          </>
        )}

        {step === 1.122 && (
          <>
            <Question text="How would you describe the pain in your joints?" />
            {(
              [
                "Sharp or severe",
                "Dull or aching",
                "Stiffness or limited movement",
                "Swelling or warmth",
              ] as JointSevere[]
            ).map((option) => (
              <Option key={option} onClick={() => handleSelectJs(option)}>
                {option}
              </Option>
            ))}
          </>
        )}

        {step === 1.131 && (
          <>
            <Question text="Where is the muscle ache located? (Select all that apply)" />
            {[
              "Upper back and shoulders",
              "Lower back",
              "Arms",
              "Legs",
              "General body ache",
            ].map((option) => (
              <Option
                key={option}
                onClick={() => handleSelectSpecificMuscle(option)}
                isSelected={selectedMuscleOptions.includes(option)}
              >
                {option}
              </Option>
            ))}
            <br></br>
            <button
              className="mt-4 text-sm border py-2 px-6 rounded bg-green text-white "
              onClick={handleMuscleNext}
            >
              Next
            </button>
          </>
        )}

        {step === 1.132 && (
          <>
            <Question text="What triggers your muscle ache?" />
            {(
              [
                "Physical activity or exercise",
                "Stress or tension",
                "Prolonged sitting or standing",
                "Unidentified; it occurs randomly",
              ] as MuscleTrigger[]
            ).map((option) => (
              <Option key={option} onClick={() => handleSelectMt(option)}>
                {option}
              </Option>
            ))}
          </>
        )}

        {step === 1.141 && (
          <>
            <Question text="Can you pinpoint where the abdominal pain is most intense?" />
            {(
              [
                "Upper abdomen",
                "Lower abdomen",
                "Right side",
                "Left side",
                "Diffuse, all over the abdomen",
              ] as AbdominalLocation[]
            ).map((option) => (
              <Option key={option} onClick={() => handleSelectAl(option)}>
                {option}
              </Option>
            ))}
          </>
        )}

        {step === 1.142 && (
          <>
            <Question text="What type of sensation do you experience with your abdominal pain?" />
            {(
              [
                "Sharp or stabbing",
                "Cramping or spasmodic",
                "Dull or aching",
                "Bloating or gassy feeling",
              ] as AbdominalSevere[]
            ).map((option) => (
              <Option key={option} onClick={() => handleSelectAs(option)}>
                {option}
              </Option>
            ))}
          </>
        )}

        {step === 1.151 && (
          <>
            <Question text="Can you describe the nature of your chest discomfort?" />
            {(
              [
                "Sharp or piercing pain",
                "Tightness or pressure",
                "Burning sensation",
                "Heavy feeling or squeezing",
              ] as ChestSevere[]
            ).map((option) => (
              <Option key={option} onClick={() => handleSelectCs(option)}>
                {option}
              </Option>
            ))}
          </>
        )}

        {step === 1.152 && (
          <>
            <Question text="Does anything specific trigger your chest discomfort?" />
            {(
              [
                "Physical exertion",
                "Emotional stress",
                "Eating or digestion",
                "Breathing deeply",
              ] as ChestTrigger[]
            ).map((option) => (
              <Option key={option} onClick={() => handleSelectCt(option)}>
                {option}
              </Option>
            ))}
          </>
        )}

        {step === 1.161 && (
          <>
            <Question text="Where is your back pain located?" />
            {(
              [
                "Upper back",
                "Middle back",
                "Lower back",
                "Spreads to the buttocks or legs",
              ] as BackLocation[]
            ).map((option) => (
              <Option key={option} onClick={() => handleSelectBl(option)}>
                {option}
              </Option>
            ))}
          </>
        )}

        {step === 1.162 && (
          <>
            <Question text="How would you describe your back pain?" />
            {(
              [
                "Sharp or stabbing",
                "Dull or aching",
                "Burning sensation",
                "Stiffness or immobility",
              ] as BackSevere[]
            ).map((option) => (
              <Option key={option} onClick={() => handleSelectBs(option)}>
                {option}
              </Option>
            ))}
          </>
        )}

        {step === 1.171 && (
          <>
            <Question text="Please specify the location and describe the type of pain or discomfort you are experiencing" />
            <input
              type="text"
              value={otherQ171}
              onChange={(e) => setOtherQ171(e.target.value)}
              className="my-2 border border-gray-400 rounded p-2 w-full outline-none focus:outline-none"
              placeholder="Type here..."
            />
            <Option onClick={handleOtherQ171Submit}>Submit</Option>
          </>
        )}

        {step === 1.2 && (
          <>
            <Question text="Please describe your reason." />
            <input
              type="text"
              value={otherQ1}
              onChange={(e) => setOtherQ1(e.target.value)}
              className="my-2 border border-gray-400 rounded p-2 w-full outline-none focus:outline-none"
              placeholder="Type here..."
            />
            <Option onClick={handleOtherQ1Submit}>Submit</Option>
          </>
        )}

        {step === 2 && (
          <>
            <Question text="Please select the age range that best represents you." />
            {(
              [
                "Under 18",
                "18-30",
                "31-40",
                "41-50",
                "51-60",
                "61 and older",
              ] as AgeGroup[]
            ).map((option) => (
              <Option key={option} onClick={() => handleSelectAgeGroup(option)}>
                {option}
              </Option>
            ))}
          </>
        )}

        {step === 3 && (
          <>
            <Question text="What is your gender identity?" />
            {(
              ["Male", "Female", "Non-binary", "Prefer not to say"] as Gender[]
            ).map((option) => (
              <Option key={option} onClick={() => handleSelectGender(option)}>
                {option}
              </Option>
            ))}
          </>
        )}

        {step === 4 && (
          <>
            <Question text="How would you describe your current mental and emotional state?" />
            {(
              [
                "Generally stable and positive",
                "Frequently anxious or nervous",
                "Often feel down or depressed",
                "Experience mood swings",
                "Feel stressed or overwhelmed",
                "Other",
              ] as MentalState[]
            ).map((option) => (
              <Option key={option} onClick={() => handleSelectMental(option)}>
                {option}
              </Option>
            ))}
          </>
        )}

        {step === 4.1 && (
          <>
            <Question text="Please specify your mental state" />
            <input
              type="text"
              value={otherQ41}
              onChange={(e) => setOtherQ41(e.target.value)}
              className="my-2 border border-gray-400 rounded p-2 w-full outline-none focus:outline-none"
              placeholder="Type here..."
            />
            <Option onClick={handleOtherQ41Submit}>Submit</Option>
          </>
        )}

        {step === 5 && (
          <>
            <Question text="Have you noticed any changes in your energy levels lately?" />
            {(
              [
                "Yes, I feel more energetic",
                "Yes, I feel less energetic",
                "No significant change",
              ] as Energy[]
            ).map((option) => (
              <Option key={option} onClick={() => handleSelectEnergy(option)}>
                {option}
              </Option>
            ))}
          </>
        )}

        {step === 6 && (
          <>
            <Question text="How has your sleep been?" />
            {(
              [
                "Regular and restful",
                "Difficulty falling asleep",
                "Waking up frequently during the night",
                "Feeling tired after waking up",
                "Other",
              ] as Sleep[]
            ).map((option) => (
              <Option key={option} onClick={() => handleSelectSleep(option)}>
                {option}
              </Option>
            ))}
          </>
        )}

        {step === 6.1 && (
          <>
            <Question text="Please specify your sleep state" />
            <input
              type="text"
              value={otherQ61}
              onChange={(e) => setOtherQ61(e.target.value)}
              className="my-2 border border-gray-400 rounded p-2 w-full outline-none focus:outline-none"
              placeholder="Type here..."
            />
            <Option onClick={handleOtherQ61Submit}>Submit</Option>
          </>
        )}

        {step === 7 && (
          <>
            <Question text="Have there been any significant changes in your diet or appetite?" />
            {(
              [
                "Eating more than usual",
                "Eating less than usual",
                "Cravings for specific foods",
                "Changes in appetite but not in eating habits",
                "No significant changes",
              ] as Diet[]
            ).map((option) => (
              <Option key={option} onClick={() => handleSelectDiet(option)}>
                {option}
              </Option>
            ))}
          </>
        )}

        {step === 7.1 && (
          <>
            <Question text="What type of foods have you been craving" />
            {(
              ["Sweet", "Salty", "Bitter", "Sour", "Pungent", "Other"] as Food[]
            ).map((option) => (
              <Option key={option} onClick={() => handleSelectFood(option)}>
                {option}
              </Option>
            ))}
          </>
        )}

        {step === 7.11 && (
          <>
            <Question text="Please specify the food have you been craving?" />
            <input
              type="text"
              value={otherQ711}
              onChange={(e) => setOtherQ711(e.target.value)}
              className="my-2 border border-gray-400 rounded p-2 w-full outline-none focus:outline-none"
              placeholder="Type here..."
            />
            <Option onClick={handleOtherQ711Submit}>Submit</Option>
          </>
        )}

        {step === 8 && (
          <>
            <Question text="Do you take any medications regularly?" />
            {(["Yes", "No", "Prefer not to say"] as Medications[]).map(
              (option) => (
                <Option
                  key={option}
                  onClick={() => handleSelectMedications(option)}
                >
                  {option}
                </Option>
              )
            )}
          </>
        )}

        {step === 8.1 && (
          <>
            <Question text="Please specify which medications you take" />
            <input
              type="text"
              value={otherQ81}
              onChange={(e) => setOtherQ81(e.target.value)}
              className="my-2 border border-gray-400 rounded p-2 w-full outline-none focus:outline-none"
              placeholder="Type here..."
            />
            <Option onClick={handleOtherQ81Submit}>Submit</Option>
          </>
        )}

        {step === 9 && (
          <>
            <Question
              text="As we approach the final step, it's important we consider all aspects of your well-being.
Are there any other health concerns or details you feel would be helpful for me to know?
This can ensure that the herbal formula I recommend is perfectly attuned to your needs. Please share anything you think is relevant—no detail is too small."
            />
            {["Yes, there's more to share about my health", "No"].map(
              (option) => (
                <Option
                  key={option}
                  onClick={() => handleFinalQuestion(option)}
                >
                  {option}
                </Option>
              )
            )}
          </>
        )}

        {step === 9.1 && (
          <>
            <Question text="What additional information would be helpful for me to know?" />
            <input
              type="text"
              value={otherFinal}
              onChange={(e) => setOtherFinal(e.target.value)}
              className="my-2 border border-gray-400 rounded p-2 w-full outline-none focus:outline-none"
              placeholder="Type here..."
            />
            <Option onClick={handleOtherFinalSubmit}>Submit</Option>
          </>
        )}

        {step === 10 && (
          <>
            <Question text="Thank you for sharing your details with me! I'm now thoughtfully analyzing the information you've provided to craft a herbal recommendation that’s just right for you. This process is a bit like brewing a soothing tea—it takes a short while, but the result is worth the wait. I’ll be ready with your personalized wellness blend in just a moment." />
            <div className="text-center mt-12">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-green"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </>
        )}
      </div>

      {(step === 0 || step === 11) && (
        <>
          <div className="flex-1 overflow-y-auto px-2 py-2" ref={messagesEndRef}>
            {messages.map((message, idx) => {
              if (message.role === "assistant") {
                return null; // Renders nothing for "assistant" role
              }
              return (
                <div
                  key={idx}
                  className={`flex mb-4 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-md p-2 max-w-xs md:max-w-xl ${
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
                              className="text-sm"
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
                      <p className="text-sm">{message.content}</p>
                    )}
                  </div>
                </div>
              );
            })}
            {/* <div ref={messagesEndRef} /> */}
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
                ref={fileInputRef}
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
        </>
      )}
    </div>
  );
}

export default ChatContainer;

const Question: React.FC<{ text: string }> = ({ text }) => (
    <div className="mb-4">
      <h2 className="text-sm">{text}</h2>
    </div>
  );
  
  export default Question;
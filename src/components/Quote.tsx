import React, { useEffect, useState } from "react";
import { Quote } from "../interface/quote";
import "../style/quote.css"

const QuoteBox: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    try {
      setError(null); //reset error
      const response = await fetch("https://api.quotable.io/random");
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      const data = await response.json();
      setQuote({ content: data.content, author: data.author });
    } catch (err) {
      setError("Could not fetch a quote. Try again later.");
      console.error("Error fetching quote:", err);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quoteBox">
      {error ? (
        <p className="error">{error}</p>
      ) : quote ? (
        <>
          <p className="quote-text">"{quote.content}"</p>
          <p className="quote-author">- {quote.author}</p>
        </>
      ) : (
        <p>Loading quote...</p>
      )}
      <button onClick={fetchQuote} className="quote-button">🔄 Get New Quote</button>
    </div>
  );
};

export default QuoteBox;

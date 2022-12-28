import { useState } from "react";

const MessageForm = () => {
  const [to, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dialogue = { to, message };
    const resposne = await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify(dialogue),
      headers: { "Content-Type": "application/json" },
    });

    if (resposne.ok) {
      setMessage("");
      setNumber("");
      setError(null);
    } else {
      const json = await resposne.json();
      setError(json.error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="card bg-success text-light">
        <form
          className="form-group bg-success m-3 mc-1 mt-1"
          onSubmit={handleSubmit}
        >
          <h3 className="mb-3 text-center">Send Message</h3>
          <label className="text-center">Contact</label>
          <input
            type="number"
            className="form-control"
            placeholder="94763891917"
            onChange={(e) => setNumber(e.target.value)}
            value={to}
          />
          <label className="text-center">Message</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Hi there"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <div className="text-center">
            <button
              className="btn btn-lg mt-3 btn-light btn-block text-success fw-bold"
              type="Submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      {error && (
        <div className="container text-center">
          <div className="card bg-danger mt-3">
            <p className="m-2 text-light">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default MessageForm;

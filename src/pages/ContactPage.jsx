import React, { useEffect, useRef, useState } from "react";
import abstractImg from "../assets/pink-abstract.webp";
import InputField from "../components/InputField";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 
import { db } from "../modules/firebase-modules/firestore";

const ContactPage = () => {
  const [whatsappNumber, setWhatsappNumber] = useState(null);
  const [name, setName] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // Honeypot state to catch bots
  const formRef = useRef(null);

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
      setWhatsappNumber("");
      setName("");
      setMessage("");
    }
  };

  const validatePhoneNumber = (number) => {
    if (!number?.length) {
      setError("");
      return true;
    }
    const regex = /^(\+92|0)?3[0-9]{9}$/;
    if (regex.test(number)) {
      setError("");
      return true;
    } else {
      setError("Please enter a valid number (e.g., +923XXXXXXXXX)");
      return false;
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(honeypot)
    // Honeypot check
    if (honeypot) {
      toast.error("Spam detected!");
      setLoading(false);
      return;
    }

    if (!validatePhoneNumber(whatsappNumber)) {
      toast.error("Kindly enter a valid WhatsApp number");
      setLoading(false);
    } else if (!message.length) {
      toast.error("Kindly enter something in the message box");
      setLoading(false);
    } else {
      try {
        const msgData = {
          name,
          whatsappNumber,
          message,
          createdAt: new Date()
        };

        const leadData = {
          whatsappNumber,
          createdAt: new Date()
        };

        const leadsCollection = collection(db, "leads");
        const msgCollection = collection(db, "msgs");

        const q = query(leadsCollection, where("phoneNumber", "==", whatsappNumber));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          await addDoc(leadsCollection, leadData);
        }
        
        await addDoc(msgCollection, msgData);
        handleReset();
        toast.success("Message sent successfully");
      } catch (e) {
        toast.error("Can't connect to the database, try again later.");
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main className="py-10 pb-[10rem]">
      <h1 className="text-5xl my-10 items-center p-8">Contact Us</h1>
      <form
        className="w-full flex justify-center gap-8 items-center md:flex-row flex-col-reverse"
        ref={formRef}
        onSubmit={handleSubmission}
      >
        <div className="md:flex  hidden">
          <img src={abstractImg} alt="" className="max-h-[30rem] rounded-xl  md:aspect-auto aspect-video" />
        </div>
        <div className="w-full p-4 md:p-0 md:w-1/3 flex flex-col gap-4 ">
          <h3 className="text-2xl text-left">Let's Talk!</h3>

          {/* Honeypot field */}
          <input
            type="text"
            style={{ display: "none" }} // Hidden field
            tabIndex="-1"
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            placeholder="Do not fill this field"
          />

          <InputField
            inputType="name"
            valueReturner={setName}
            inputAutoComplete={"name"}
            inputValue={name}
            requiredInput={true}
          />
          <InputField
            inputType="tel"
            valueReturner={setWhatsappNumber}
            inputAutoComplete={"tel"}
            inputValue={whatsappNumber}
            errorMsg={error}
            inputName="Your WhatsApp Number"
            requiredInput={true}
          />
          <textarea
            name="message"
            className="min-h-[15rem] resize-y rounded-md"
            placeholder="Your Message"
            onInput={(e) => setMessage(e.target.value.trim())}
          ></textarea>
          <Button className="bg-black flex justify-center" loading={loading} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
};

export default ContactPage;

import React from "react";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const Accordian = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  useEffect(()=>{
    AOS.init({
      duration: 1000,
    });
  
  })
  return (
    <>
      <div className="wrapper bg-gray-200 bg-opacity-50">
        <div className="Faq-container max-w-screen-lg w-full mx-auto">
          <p className="text-center font-Rubik pt-12 md:pt-16 text-2xl md:text-4xl" data-aos="fade-up">
            FAQs
          </p>
          {data.map((item, i) => (
            <div className="ss">
              <div className="item py-2" key={i} data-aos="fade-up" data-aos-dealy="100">
                <div className="title" onClick={() => toggle(i)}>
                  <h2 className=" text-lg md:text-xl text-green-600 font-semibold mb-2 font-Rubik" >
                    {item.question}
                  </h2>
                  <span>{selected === i ? "-" : "+"}</span>
                </div>
                <div className={selected === i ? "content show" : "content"}>
                  <div className="">
                    <p
                      className="text-slate-600 text-sm md:text-base font-Rubik custom-padding"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const data = [
  {
    question: "What is PrithWe?",
    answer: `PrithWe is a comprehensive carbon footprint calculator designed for both households and businesses. It helps users estimate their carbon emissions and provides insights on how to reduce them. By understanding and managing their carbon footprints, users can contribute to a more sustainable future.

      `,
  },
  {
    question: "How do I use the carbon footprint calculator?",
    answer:
      " Using PrithWe's carbon footprint calculator is easy! Simply log in, select whether you are a household or a business, and fill in the required details about your energy consumption, transportation habits, and other activities. The calculator will then provide you with an estimate of your carbon emissions and it shows interactive charts from which you can take steps for reducing your environmental impact.",
  },
  {
    question: "I forgot my password. What should I do?",
    answer: ` If you forgot your password, click on the "Forgot Password" button on the login page. Enter your email address, and an OTP (One-Time Password) will be sent to you. Use the OTP to reset your password and regain access to your account.`,
  },
  {
    question: "Why is it important to calculate my carbon footprint?",
    answer: `Calculating your carbon footprint is crucial for understanding your personal or organizational impact on the environment. By knowing how much carbon dioxide and other greenhouse gases you are responsible for, you can take steps to reduce your emissions, conserve resources, and contribute to the fight against climate change.`,
  },
];

export default Accordian;

import React, { useState, useContext } from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import "./LeaveAQuestion.css";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { toast } from "react-toastify";

const LeaveAQuestion = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const { user } = useContext(AppStateContext);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate name and email fields
    let hasError = false;

    if (!name) {
      setNameError("Please enter your name");
      hasError = true;
    }
    if (comment.trim().split(/\s+/).length < 10) {
      setCommentError("Please enter at least 10 words");
      hasError = true;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }
    if (hasError) {
      return;
    }
    const data = { name, email, comment };
    try {
      const response = await fetch(`${apiUrl}/web/leave/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Message sent successfully");
        setName("");
        setEmail("");
        setComment("");
      } else {
        const errorResponse = await response.json();
        const errorMessage =
          errorResponse && errorResponse.message
            ? errorResponse.message
            : "Something went wrong";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    setCommentError("");
  };

  return (
    // <section className="LeaveAQuestion-form-section-os">
    //   <div className="container-os">
    //     <div className="LeaveAQuestion-all-form-data-os">
    //       <form onSubmit={handleSubmit} className="LeaveAQuestion-form-os">
    //         <div className="LeaveAQuestion-headings-os">
    //           <MainHeading MainHeading="Leave a Question" image={`${panelImg}/assets/img/vip-images/crown-icon_yc1abp.webp`} />
    //           <div className="LeaveAQuestion-subheading-os">
    //             Your email address will not be published.
    //           </div>
    //         </div>
    //         <div className="LeaveAQuestion-textarea-os">
    //           <textarea
    //             cols="30"
    //             rows="10"
    //             placeholder="Comment"
    //             value={comment}
    //             onChange={handleCommentChange}
    //           />
    //           {commentError && (
    //             <div className="error-message">{commentError}</div>
    //           )}
    //         </div>

    //         <div className="LeaveAQuestion-input-data-row-os">
    //           <div className="LeaveAQuestion-input-data-col-1">
    //             <input
    //               type="text"
    //               placeholder="Your Name*"
    //               value={name}
    //               onChange={handleNameChange}
    //             />
    //             {nameError && <div className="error-message">{nameError}</div>}
    //           </div>
    //           <div className="LeaveAQuestion-input-data-col-1">
    //             <input
    //               type="email"
    //               placeholder="Your Email*"
    //               value={email}
    //               onChange={handleEmailChange}
    //             />
    //             {emailError && (
    //               <div className="error-message">{emailError}</div>
    //             )}
    //           </div>
    //         </div>
    //         <div className="LeaveAQuestion-submit-question-btn-os">
    //           <button type="submit" aria-label="SUBMIT QUESTION">SUBMIT QUESTION</button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </section>
    <section className="LeaveAQuestion-form-section-os">
      <div className="container-os">
        <div className="LeaveAQuestion-all-form-data-os">
          <form onSubmit={handleSubmit} className="LeaveAQuestion-form-os">
            <div className="LeaveAQuestion-headings-os">
              <MainHeading
                MainHeading="Leave a Question"
                image={`${panelImg}/assets/img/vip-images/crown-icon_yc1abp.webp`}
              />
              <div className="LeaveAQuestion-subheading-os">
                Your email address will not be published.
              </div>
            </div>

            <div className="LeaveAQuestion-textarea-os">
              <textarea
                cols="30"
                rows="10"
                id="comment"
                placeholder="comment...."
                value={comment}
                onChange={handleCommentChange}
                className="peer w-full bg-transparent text-gray-900 border-2 border-primary rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-primary  transition duration-300 ease-in-out"
              />
              <label
                htmlFor="comment"
                className={`absolute left-4 transition-all transform origin-left text-primary ${
                  comment
                    ? "-top-2 text-xs text-primary scale-90"
                    : "top-[14px] text-primary bg-white"
                } peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90`}
              >
                Comment
              </label>
              {commentError && (
                <div className="error-message">{commentError}</div>
              )}
            </div>

            <div className="LeaveAQuestion-input-data-row-os">
              <div className="LeaveAQuestion-input-data-col-1">
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    placeholder=" "
                    value={name}
                    onChange={handleNameChange}
                    className="peer w-full bg-transparent text-gray-900 border-2 border-primary rounded-md p-4 focus:outline-none focus:ring-1 focus:ring-primary  focus:border-primary transition duration-300 ease-in-out"
                  />
                  <label
                    htmlFor="name"
                    className={`absolute  bg-white  left-4 transition-all transform origin-left text-primary ${
                      name
                        ? "-top-2 text-xs text-primary scale-90"
                        : "top-[14px] text-primary bg-white"
                    } peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90`}
                  >
                    Your Name*
                  </label>
                </div>
                {nameError && <div className="error-message">{nameError}</div>}
              </div>

              <div className="LeaveAQuestion-input-data-col-1">
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder=" "
                    value={email}
                    onChange={handleEmailChange}
                    className="peer w-full bg-white text-gray-900 border-2 border-primary rounded-md p-4 focus:outline-none focus:ring-1 focus:ring-primary  transition duration-300 ease-in-out"
                  />
                  <label
                    htmlFor="email"
                    className={`absolute bg-white left-4 transition-all transform origin-left text-primary ${
                      email
                        ? "-top-2 text-xs text-primary scale-90"
                        : "top-4 text-primary bg-white"
                    } peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90`}
                  >
                    Your Email*
                  </label>
                </div>

                {emailError && (
                  <div className="error-message">{emailError}</div>
                )}
              </div>
            </div>

            <div className=" flex justify-center">
              <button
                type="submit"
                aria-label="SUBMIT QUESTION"
                className="bg-primary  text-white px-6 py-2 rounded-md hover:bg-secondary hover:text-darktext transition duration-300 ease-in-out"
              >
                SUBMIT QUESTION
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeaveAQuestion;

import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const Footer = () => {
  const { user } = useSelector((store) => store.auth);
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm("service_5km3vb6", "template_jz85bdv", form.current, {
        publicKey: "RfJuZmB_y7HRGjc6h",
      })
      .then(
        () => {
          toast.info("Thank You for Subscribing!", {
            autoClose: 3000,
            hideProgressBar: true,
          });
          setLoading(false);
        },
        (error) => {
          toast.error("Something went wrong!", {
            autoClose: 3000,
            hideProgressBar: true,
          });
          setLoading(false);
        }
      );
  };
  return (
    <div className="bg-sky-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-16 px-4 sm:px-6 lg:px-12 md:gap-y-12 lg:gap-y-0 gap-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-semibold">
          Career<span className="text-white font-bold">Connect</span>
        </h1>
        <div className="text-white">
          <p className="font-semibold">Contact us:</p>
          <p className="text-sm mt-2">Email: careerconnect.jmi@gmail.com</p>
          <p className="text-sm">Address: Noida, UP, India</p>
        </div>
      </div>
      <div className="text-white flex flex-col gap-6 md:ml-6">
        <h2 className="text-2xl font-semibold">Quick Links</h2>
        <ul className="flex flex-col gap-3">
          {!user || user?.role === "student" ? (
            <>
              <li className="hover:underline">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:underline">
                <Link to="/jobs">Jobs</Link>
              </li>
            </>
          ) : (
            <>
              <li className="hover:underline">
                <Link to="/admin/companies">Companies</Link>
              </li>
              <li className="hover:underline">
                <Link to="/admin/jobs">Jobs</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="flex flex-col gap-6 text-white ">
        <p className="text-2xl font-semibold">Subscribe to Our Newsletter</p>
        <form className="flex flex-col gap-3" onSubmit={sendEmail} ref={form}>
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="name@email.com"
            className="py-2 bg-transparent border-b-2 outline-none text-sm"
          />
          <Button
            type="submit"
            className="bg-white text-black rounded-full py-2 mt-3 text-sm font-semibold cursor-pointer hover:bg-gray-300"
          >
           {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <span>Subscribe</span>
            )}
          </Button>
        </form>
      </div>
      <p className="text-white text-sm font-light md:ml-6 lg:ml-0">
        Copyright@careerConnect 2024
      </p>
    </div>
  );
};

export default Footer;

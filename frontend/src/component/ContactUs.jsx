import React from 'react';
import { FaUser, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import "./ContactUs.css"

const ContactUs = () => {
    return (
        <section className="contact bg-white py-12" id="contact">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="title text-3xl font-bold  relative after:absolute after:left-0 after:right-0 after:bottom-0 after:border-b-2 after:border-crimson after:w-full">
                    Contact me
                </h2>
                <div className="contact-content flex flex-wrap gap-8 mt-4">
                    <div className="column left w-full md:w-1/2">
                        <div className="text text-lg font-semibold mb-4">Get in Touch</div>
                        <p className="text-justify mb-4">
                            If you are interested in working together? Please fill out the form aside with some info about your project and I will get back to you as soon as I can. Please allow a couple days for me to respond.
                        </p>
                        <div className="icons space-y-4">
                            <div className="row flex items-center">
                                <FaUser className="text-crimson text-2xl" />
                                <div className="info ml-4">
                                    <div className="head font-medium">Name</div>
                                    <div className="sub-title text-gray-800">Hem Bahadur Pun</div>
                                </div>
                            </div>
                            <div className="row flex items-center">
                                <FaMapMarkerAlt className="text-crimson text-2xl" />
                                <div className="info ml-4">
                                    <div className="head font-medium">Address</div>
                                    <div className="sub-title text-gray-800">Pokhara, Nepal</div>
                                </div>
                            </div>
                            <div className="row flex items-center">
                                <FaEnvelope className="text-crimson text-2xl" />
                                <div className="info ml-4">
                                    <div className="head font-medium">Email</div>
                                    <div className="sub-title text-gray-800">mail@gmail.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column right w-full md:w-1/2">
                        <div className="text text-lg font-semibold mb-4">Message me</div>
                        <form action="#" className="space-y-4">
                            <div className="fields flex flex-wrap gap-4">
                                <div className="field name flex-1">                               
                                    <input type="text" placeholder="Name" required className="h-12 w-full border border-light-gray rounded-lg px-4 text-lg font-medium focus:border-gray-400" />
                                </div>
                                <div className="field email flex-1">
                                    <input type="email" placeholder="Email" required className="h-12 w-full border border-light-gray rounded-lg px-4 text-lg font-medium focus:border-gray-400" />
                                </div>
                            </div>
                            <div className="field">
                                <input type="text" placeholder="Subject" required className="h-12 w-full border border-light-gray rounded-lg px-4 text-lg font-medium focus:border-gray-400" />
                            </div>
                            <div className="field textarea">
                                <textarea cols="30" rows="10" placeholder="Message.." required className="h-20 w-full border border-light-gray rounded-lg px-4 text-lg font-medium resize-none focus:border-gray-400"></textarea>
                            </div>
                            <div className="button-area flex items-center">
                                <button type="submit" className="w-40 h-12 border-2 border-crimson text-crimson font-medium rounded-lg hover:bg-crimson hover:text-white transition-all">Send message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;

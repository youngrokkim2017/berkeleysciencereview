import React from "react"
import { Link } from "gatsby"
import MailchimpComponent from './mailchimp'

const Footer = () => {
    return (
        <nav className="mt-16 sans-serif text-white px-4 sm:px-6 xl:px-6 pb-24 text-md" style={{backgroundColor : '#003262'}}>
            <div className="container mx-auto mt-12">
                <div className="block flex-grow lg:flex lg:w-auto space-y-8 lg:space-y-0">
                    <div className="lg:flex-grow">
                        <h2 className="font-bold mb-2"><Link to="/about-us/">About Us</Link></h2>
                        <ul className="m-0 space-y-2">
                            <li><Link to="/staff-listing/">Our Staff</Link></li>
                            <li><Link to="/join-us/">Join Our Team</Link></li>
                            <li><Link to="/write-for-us/">Write For Us</Link></li>
                        </ul>
                    </div>
                    <div className="lg:flex-grow">
                        <h2 className="font-bold mb-2"><Link to="/contact/">Contact Us</Link></h2>
                        <ul className="m-0 space-y-2">
                            <li><Link to="/donate-and-subscribe/">Donate and Subscribe</Link></li>
                        </ul>
                    </div>
                    <div className="lg:flex-grow">
                        <h2 className="font-bold mb-2"><Link to="/writing-resources/">Writing Resources</Link></h2>
                    </div>
                    
                    <div className="lg:flex-shrink max-w-sm">
                    <div className="lg:flex-grow mb-8 lg:mb-12">
                        <h2 className="font-bold mb-2">Follow</h2>
                        <div className="flex flex-row space-x-4 align-items-center">
                            <a href="https://www.facebook.com/berkeleyscirev" className="flex items-center space-x-2 no-underline">
                                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M15.117 0H.883A.883.883 0 0 0 0 .883v14.234c0 .488.395.883.883.883h7.663V9.804H6.461V7.389h2.085V5.61c0-2.067 1.262-3.192 3.106-3.192.883 0 1.642.065 1.863.095v2.16h-1.279c-1.002 0-1.196.476-1.196 1.176v1.541h2.39l-.31 2.415h-2.08V16h4.077a.883.883 0 0 0 .883-.883V.883A.883.883 0 0 0 15.117 0"></path>
                                </svg>
                                <span>Facebook</span>
                            </a>
                            <a href="https://twitter.com/BerkeleySciRev" className="flex items-center space-x-2 no-underline">
                                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                                </svg>
                                <span>Twitter</span>
                            </a>
                        </div>
                    </div>
                        <MailchimpComponent />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Footer;
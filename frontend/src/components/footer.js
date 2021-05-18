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
                            <a href="https://www.instagram.com/berkeleyscirev/" className="flex items-center space-x-2 no-underline">
                                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
                                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" className=""></path>
                                </svg>
                                <span>Instagram</span>
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
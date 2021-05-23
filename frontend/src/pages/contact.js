import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Layout from "../components/layout"
import Seo from "../components/seo"

const MyForm = () => {
  const [state, handleSubmit] = useForm("mnqokooe");
  return (
    <Layout>
      <Seo title="Contact Us" />
      <h2 className="font-normal text-4xl mb-4">Contact us</h2>
      <form
        onSubmit={handleSubmit}
        className="sans-serif"
      >
        <div className="space-y-4 w-full lg:w-2/5">
          <div className="required">
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input type="text" name="name" className="border-black text-black placeholder-gray-600 block w-full border py-2 px-3 focus-within:border-blue-600 focus:outline-none rounded" required />
            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
            />
          </div>
          <div className="required">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input type="email" name="_replyto" className="border-black text-black placeholder-gray-600 block w-full border py-2 px-3 focus-within:border-blue-600 focus:outline-none rounded" placeholder="you@example.com" required />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
            <input type="text" name="subject" className="border-black text-black placeholder-gray-600 block w-full border py-2 px-3 focus-within:border-blue-600 focus:outline-none rounded" />
          </div>
          <div className="required">
            <label htmlFor="message" className="block text-sm font-medium">Message</label>
            <div className="mt-1">
              <textarea id="message" name="message" rows="4" className="border-black text-black placeholder-gray-600 block w-full border py-2 px-3 focus-within:border-blue-600 focus:outline-none rounded" required></textarea>
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          {state.succeeded ? <p>Thank you.</p> : <button className="inline-block px-4 py-2 text-white bg-black flex-shrink-0 cursor-pointer rounded w-full lg:w-48">Submit</button>}
          {state.errors.length > 0 && <p>Ooops! There was an error.</p>}
        </div>
      </form>
    </Layout>
  );
}

export default MyForm;
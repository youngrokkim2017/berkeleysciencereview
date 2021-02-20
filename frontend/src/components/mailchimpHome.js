import React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import Error from './error.js'

class MailchimpComponentHome extends React.Component {
    state = {
        email: null,
        processing: false,
        success: false,
        error: ''
    }

    _handleChange = e => {
        // console.log({
        //     [`${e.target.name}`]: e.target.value,
        // })
        this.setState({
            [`${e.target.name}`]: e.target.value,
        })
    }

    _handleSubmit = e => {
        e.preventDefault()

        // console.log('submit', this.state)

        // addToMailchimp(this.state.email, this.state)
        this.setState({ processing: true });
        addToMailchimp(this.state.email)
            .then(({ msg, result }) => {
                if (result !== 'success') {
                    throw msg
                }
                this.setState({ success: true });
            })
            .catch(err => {
                this.setState({ error: err })
                this.setState({ processing: false });
            })
    }

    render() {
        return (
            <div className="sans-serif">
                {this.state.error ? <Error msg={this.state.error} /> : ''}
                <h2 className="font-bold mb-1">Sign up for the BSR Newsletter</h2>
                <div>
                    <p className="mb-4">Get an overview of our latest news, along with fascinating images and people.</p>
                    <form onSubmit={this._handleSubmit} className={`text-gray-600 ${this.state.success ? 'hidden' : 'block'}`}>
                        <input
                            type="email"
                            onChange={this._handleChange}
                            placeholder="Email address"
                            name="email"
                            className="rounded outline-none w-full text-black placeholder-gray-600 leading-tight mr-2 py-2 px-4 pr-2 mb-4 border border-gray-400 focus-within:border-blue-600"
                        />
                        {this.state.processing
                            ?
                            <span className="inline-flex w-full px-4 py-3 leading-none text-white flex-shrink-0 bg-gray-500 transition ease-in-out duration-150 cursor-pointer rounded">
                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing
                            </span>
                            :
                            <input type="submit" className="w-full px-4 py-3 leading-none text-white flex-shrink-0 cursor-pointer bg-black rounded" value="Subscribe" />
                        }
                    </form>
                    <div className={this.state.success ? 'block' : 'hidden'}>
                        Thank you for subscribing! Please check your email for confirmation.
                    </div>
                </div>
            </div>
        )
    }
}

export default MailchimpComponentHome;

// class MailchimpComponent extends React.Component {
//   // Since `addToMailchimp` returns a promise, you
//   // can handle the response in two different ways:

//   // Note that you need to send an email & optionally, listFields
//   // these values can be pulled from React state, form fields,
//   // or wherever.  (Personally, I recommend storing in state).

//   // 1. via `.then`
//   _handleSubmit = e => {
//     e.preventDefault();
//     // addToMailchimp(email, listFields) // listFields are optional if you are only capturing the email address.
//     addToMailchimp(email) 
//     .then(data => {
//       // I recommend setting data to React state
//       // but you can do whatever you want (including ignoring this `then()` altogether)
//       console.log(data)
//     })
//     .catch(() => {
//       // unnecessary because Mailchimp only ever
//       // returns a 200 status code
//       // see below for how to handle errors
//     })
//   }

//   // 2. via `async/await`
//   _handleSubmit = async (e) => {
//     e.preventDefault();
//     // const result = await addToMailchimp(email, listFields)
//     const result = await addToMailchimp(email)
//     // I recommend setting `result` to React state
//     // but you can do whatever you want
//   }

//   render () {
//     return (
//       // <form onSubmit={this._handleSubmit(email, {listFields})}>
//       <form onSubmit={this._handleSubmit(email)}>

//       </form>
//     )
//   }
// }

// export default MailchimpComponent;
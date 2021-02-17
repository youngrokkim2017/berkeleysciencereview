import React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'

class MailchimpComponent extends React.Component {
    state = {
        // name: null,
        email: null,
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
        addToMailchimp(this.state.email)
            .then(({ msg, result }) => {
                console.log('msg', `${result}: ${msg}`)

                if (result !== 'success') {
                    throw msg
                }
                alert(msg)
            })
            .catch(err => {
                console.log('err', err)
                alert(err)
            })
    }

    render() {
        return (
            <div className="sans-serif">
                <h2 className="font-bold mb-1">Sign up for the BSR Newsletter</h2>
                <div>
                    <p className="mb-4">Get an overview of our latest news, along with fascinating images and people. Sent about once a month.</p>
                    <form onSubmit={this._handleSubmit} className="bg-gray-100 text-gray-600 flex items-center py-2 px-4 pr-2 border focus-within:border-blue-600">
                        {/* <input
                            type="text"
                            onChange={this._handleChange}
                            placeholder="name"
                            name="name"
                        /> */}
                        <input
                            type="email"
                            onChange={this._handleChange}
                            placeholder="Email address"
                            name="email"
                            className="bg-transparent border-none w-full text-black placeholder-gray-600 leading-tight focus:outline-none mr-2"
                        />
                        <input type="submit" className="inline-block px-4 py-2 leading-none text-white flex-shrink-0 cursor-pointer bg-blue-600" value="Subscribe" />
                    </form>
                </div>
            </div>
        )
    }
}

export default MailchimpComponent;
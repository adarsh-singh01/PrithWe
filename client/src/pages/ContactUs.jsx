import React from 'react';
import ContactUsForm from '../components/ContactUsForm';

function ContactUs() {
  return (
    <div className='flex bg-gray-200 bg-opacity-50 py-28 md:py-40 container '>
      <div class="flex-none mt-30">
        <img src="src/assets/contact.jpg" alt="" class="img-fluid custom-rounded ml-20" width="400" height="400" />
      </div>

      <div class="flex-none ml-60 ">
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactUs;
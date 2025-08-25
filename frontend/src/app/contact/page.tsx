"use client";
export default function ContactPage() {
  return (
    <section className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Header */}
      <div className="gradient bg-gradient-to-l w-dvw h-auto from-[#f3f8df] via-[#f5c3e4] to-[#e4fdfa] py-16 text-center">
        <h1 className="text-5xl font-bold text-[#a82f70]">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-600">
          We’d love to hear from you! Get in touch with us for any queries or
          assistance.
        </p>
      </div>

      {/* Contact Info + Form */}
      <div className="container mx-auto px-6 lg:px-20 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Details */}
        <div className="flex flex-col justify-center space-y-8">
          <h2 className="text-3xl font-semibold text-[#a82f70]">
            Get in Touch
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Have questions about our flowers, delivery options, or custom
            orders? Reach out to us.
          </p>
          <div className="space-y-4">
            <p className="flex items-center space-x-3">
              <span className=" font-semibold">📍 Address:</span>
              <span>123 Flower Street, Floral City</span>
            </p>
            <p className="flex items-center space-x-3">
              <span className="text-[#a82f70] font-semibold">📞 Phone:</span>
              <span>+1 (234) 567-890</span>
            </p>
            <p className="flex items-center space-x-3">
              <span className="text-[#a82f70] font-semibold">📧 Email:</span>
              <span>connect@bloom.com</span>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="gradient bg-gradient-to-l from-[#f3f8df] via-[#f5c3e4] to-[#e4fdfa] p-8 rounded-2xl shadow-md">
          <h3 className="text-2xl font-bold text-[#a82f70] mb-6">
            Send us a Message
          </h3>
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg focus:outline-none"
            />
            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full p-3 border rounded-lg focus:outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-text-[#a82f70] text-white py-3 rounded-lg text-lg font-semibold bg-[#a82f70] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Google Map */}
      <div className="mt-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9931.79138735429!2d-0.1268486!3d51.5121065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c1f3d4fca9%3A0x49d98a6bcd7b4b2c!2sFloral%20St%2C%20London%20WC2E%209DS%2C%20UK!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        <div>

          <h2 className="text-3xl font-bold">
            KreativeTech
          </h2>

          <p className="mt-5 text-slate-400">
            Delivering innovative software,
            cloud and IT solutions.
          </p>

        </div>

        <div>

          <h3 className="font-semibold mb-4">
            Company
          </h3>

          <p>About</p>

          <p>Services</p>

          <p>Contact</p>

        </div>

        <div>

          <h3 className="font-semibold mb-4">
            Services
          </h3>

          <p>Software</p>

          <p>Cloud</p>

          <p>Networking</p>

        </div>

        <div>

          <h3 className="font-semibold mb-4">
            Contact
          </h3>

          <p>info@kreativetech.com</p>

          <p>+91 XXXXX XXXXX</p>

        </div>

      </div>

    </footer>
  );
}
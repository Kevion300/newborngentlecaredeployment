export default function Footer() {
    return (
        <footer className="bg-light text-center py-3 mt-auto">
            <div className="container">
                © {new Date().getFullYear()} Newborn Gentle Care •
                <a href="/contact" className="ms-1">Contact Us</a>
            </div>
        </footer>
    );
}

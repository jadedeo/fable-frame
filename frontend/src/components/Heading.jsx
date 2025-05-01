const Heading = ({ title, subtitle }) => {
    return (
        <section className="card bg-neutral-700 h-[15%] px-5 flex items-center">
            <div>
                <h4 className="text-white">{subtitle}</h4>
                <h1 className="text-white text-3xl">{title}</h1>
            </div>
        </section>
    );
};

export default Heading;

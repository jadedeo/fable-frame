const Alert = ({ msg }) => {
    return (
        <div className=" text-red-500 pt-2 rounded-md text-sm flex gap-1 items-center">
            <i className="fa-solid fa-triangle-exclamation"></i>
            {msg}
        </div>
    );
};

export default Alert;

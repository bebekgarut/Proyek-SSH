const Info = ({ ssh, total }) => {
    return (
        <div className="mt-2 mb-4 text-black w-fit">
            Menampilkan {ssh && ssh.length > 0 ? ssh.length : 0} dari {total}{" "}
            data.
        </div>
    );
};

export default Info;




export default function ServerError({ message }: { message: string | null }) {

    if (!message) {
        return null;
    }

    return (
        <div
            className="my-2 rounded-xl border border-rose-500/40 bg-rose-950/60 p-3 text-sm text-rose-200"
            role="alert"
        >
            <p>{message}</p>
        </div>
    );
}
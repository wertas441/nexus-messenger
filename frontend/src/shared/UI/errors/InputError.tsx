
export default function InputError({error}:{error: string | undefined}){

    return (
        <div className="min-h-6">
            {error  && (
                <p className="pt-2 pl-1 text-xs text-rose-400">{error}</p>
            )}
        </div>
    )
}
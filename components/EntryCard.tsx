const EntryCard = ({ entry }: { entry: any }) => {
    const date = new Date(entry.createdAt).toDateString();
    return (
        <div className='divide-y divide-gray-400 overflow-hidden rounded-lg bg-black shadow'>
            <div className='px-4 py-4 sm:px-6'>{date}</div>
            <div className='px-4 py-4 sm:px-6'>summary</div>
            <div className='px-4 py-4 sm:px-6'>mood</div>
        </div>
    );
}

export default EntryCard;

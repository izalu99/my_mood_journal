const EntryCard = ({ entry }: any) => {
    const date = new Date(entry.createdAt).toDateString();
    return (
        <div className='divide-y divide-gray-400 overflow-hidden rounded-lg shadow bg-black'>
            <div className='px-4 py-4 sm:px-6'>{date}</div>
            <div className='px-4 py-4 sm:px-6'>{entry.analysis?.summary}</div>
            <div style={`${entry.analysis}`? {backgroundColor: `${entry.analysis?.color}`}: {backgroundColor: 'black'}} className='px-4 py-4 sm:px-6'>{entry.analysis?.mood}</div>
        </div>
    );
}

export default EntryCard;

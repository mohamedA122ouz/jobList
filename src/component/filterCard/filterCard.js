import "./filterCard.css";
export default function FilterCard({ filter, handleDel, clearFilterItem }) {
    if (filter.length > 0) {
        return (
            <>
                <div className='filter'>
                    <div className="content">
                        {filter.map((el, i) => {
                            return <>
                                <div className="tag" key={"filterID" + i}>
                                    {el}
                                    <div className="del" onClick={() => { handleDel(i) }} ></div>
                                </div>
                            </>
                        })}
                        <span className='clear' onClick={clearFilterItem}>clear</span>
                    </div>
                </div>
            </>
        );
    }
}
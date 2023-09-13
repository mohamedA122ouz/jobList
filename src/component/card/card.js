import "./card.css";
function Card({ details, width, addingFilter,tags }) {
    let {
        company,
        logo,
        new: isNew,
        featured,
        position,
        postedAt,
        contract,
        location,
    } = details;
    // console.log(details);
    // console.log("." + logo);
    function onMyMachine(logo) {
        let url = window.location.href;
        if (url.includes("3000")) {
            let ll = logo.replace("./", "");
            return "./jobList/" + ll;
        }
        return logo;
    }
    return (
        <div className={"card " + (featured ? "featured" : "") + (width < 800 ? " MP" : " PC")}>
            <div className="cardImg">
                <img src={onMyMachine(logo)} alt={company} />
            </div>
            <div className="contentWrapper">
                <div className="cardContent">
                    <span>
                        <span className="company">{company}</span>
                        {
                            (() => {
                                if (isNew !== "loading" && isNew) {
                                    return <span className="isNew">NEW!</span>;
                                }
                            })()}
                        {
                            (() => {
                                if (featured !== "loading" && featured) {
                                    return <span className="featured">FEATURED</span>;
                                }
                            })()
                        }
                    </span>
                </div>
                <div className="cardPositionName"><p>{position}</p></div>
                <div className="cardDetails">
                    <span className="post">{postedAt}</span>
                    <span className="contract">&nbsp;•&nbsp;{contract}&nbsp;•&nbsp;</span>
                    <span className="location">{location}</span>
                </div>
            </div>
            {(() => {
                if (width < 800)
                    return <hr />;
            })()
            }
            <div className="tags">
                {tags.map((el) => {
                    return <span className="tag" onClick={() => { addingFilter(el) }}>{el}</span>
                })}
            </div>
        </div>
    );

}

export default Card;
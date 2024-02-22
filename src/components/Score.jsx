const Score = ({level, points, won, lost, message}) => {
    return (
        <>
        <div id="level">Level: {level}</div>
        <div>Points: <span className={points > 0 ? "okay" : points === 0 ? "" : "warning"} >{points}</span></div>
        <div class="message"><span className="okay">{message ? "Player on the Hill!" : <br/>}</span></div>
        <div className="row">
            <div>Player: {won}</div>
            <div>Ghost: {lost}</div>
        </div>
        </>
    );
}

export default Score
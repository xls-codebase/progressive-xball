import Button from './components/Button'
import Headline from './components/Headline';
import Paragraph from './components/Paragraph';
import Icon from './components/Icon';
import Score from './components/Score';
import './index.css';
import Rack from './components/Rack';
import useLocalStorage from './hooks/useLocalStorage';
import LineChart from './components/charts/CustomLineChart';


const App = () => {
  const GAMETITLE = "Progressive X-Ball";
  const RACK_INFO_HEADLINE = "Your current Rack construction"
  const RACK_INFOTEXT = "Ball with lowest number in front, 9-Ball in the middle of the rack."
  const STATISTICS = "Game Statistics"
  const LIMIT = 5 - 1;
  const BEGIN_LEVEL = 1;
  
  const statisticEntry = (level, won, lost, cleared) => ({
    date: Date.now(), 
    level: level, 
    won: won, 
    lost: lost, 
    cleared: cleared
  });

  
  const [score, setScore] = useLocalStorage("score", {level: BEGIN_LEVEL, won: 0, lost: 0, points: 0});
  const [statistic, setStatistic] = useLocalStorage("statistic", []);
  
  const cleared = () => {
    checkUpperLimit() ? levelUp() : increaseScore();
    setStatistic([...statistic, statisticEntry(score.level, score.won, score.lost, 1)]);
  }

  const failed = () => {
    checkLowerLimit() ? levelDown() : decreaseScore();
    setStatistic([...statistic, statisticEntry(score.level, score.won, score.lost, -1)]);
  }
  
  const increaseScore = () => setScore({...score, won: score.won+1, points: score.points+1})
  const decreaseScore = () => setScore({...score, lost: score.lost+1, points: score.points-1})
  
  const checkUpperLimit = () => score.points === LIMIT ? true : false
  const checkLowerLimit = () => score.points === -LIMIT ? true : false
  
  const levelUp = () => setScore({level: score.level+1, points: 0, won: 0, lost: 0});

  const levelDown = () => { 
    if (score.level === 1) {
      decreaseScore();
      return;
    }
    setScore({level: score.level-1, points: 0, won: 0, lost: 0});
  }
  
  return (
    <>
      <div><Headline text={GAMETITLE} /></div>
      <div id="score">
        <Score level={score.level} points={score.points} won={score.won} lost={score.lost} message={score.points === 4 ? true : false} />
        <div className="row">
          <div>
            <Button onClick = {cleared}><Icon icon="check_circle" /></Button>
          </div>
          <div>
            <Button onClick = {failed}><Icon icon="cancel" /></Button>
          </div>
        </div>
      </div>
      <div id="rack-info">
        <Headline text={RACK_INFO_HEADLINE} />
        <Rack level = {score.level} />
        <Paragraph text={RACK_INFOTEXT} />
      </div>
      <div className="statistics">
        <div className="chart">
          <Headline text={STATISTICS} />
            <LineChart 
              label = "win/fail" 
              labels = {statistic.map(entry => entry.date)} 
              data = {statistic.map((el, idx, arr) => {
                return arr.slice(0, idx+1).reduce((accumulator, currentValue) => {
                  return accumulator + currentValue.cleared
                  },0,)
              })
              }
            />
        </div>
        <div className="chart">
          <LineChart 
            label = "Level" 
            labels = {statistic.map(entry => entry.date)} 
            data = {statistic.map(entry => entry.level)}
            config = {{stepped: true, borderColor: "rgb(118, 118, 118"}}
          />
        </div>
      </div>    
    </>
  )
}

export default App

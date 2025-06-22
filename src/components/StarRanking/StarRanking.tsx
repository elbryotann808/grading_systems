import type{ typesValueHandle } from "../../types";
import style from "./StarRanking.module.css"
import styleStar from "../../styles/star.module.css"

//Props que recibe la funcion
interface Props {
  handleQualification: (value: typesValueHandle) => void;
  handleStarActivate: (value: typesValueHandle) => void;
  handleStarDeactivate: () => void;
  stateColorStar: Record<typesValueHandle, boolean>;
}

const StarRating: React.FC<Props> = ({
  handleQualification,
  handleStarActivate,
  handleStarDeactivate,
  stateColorStar
}) => {
  //Array con 5, lo cual serian 5 estrellas 
  const stars: typesValueHandle[] = [1, 2, 3, 4, 5];

  return (
    <div className={style['conteiner-star']}>
      {stars.map((star) => (
        <div
          key={star}
          className={`${styleStar['star']} ${styleStar['star--pointer']} ${stateColorStar[star] ? styleStar['star--color'] : ""}`}
          onClick={() => handleQualification(star)}
          onMouseEnter={() => handleStarActivate(star)}
          onMouseLeave={handleStarDeactivate}
        ></div>
      ))}
    </div>
  );
};

export default StarRating;

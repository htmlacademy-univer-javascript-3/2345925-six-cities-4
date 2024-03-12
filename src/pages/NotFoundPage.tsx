import { FC } from "react";
import { Link } from "react-router-dom";

const NotFoundPage: FC = () => (
    <div style={{display: "flex", justifyContent: "center"}}>
        <p>
        Страница не найдена 😭 <br />
        Перейдите на <Link to="/" style={{color:"blue"}}>основную страницу</Link> чтобы продолжить работу
        </p>
    </div>
)

export default NotFoundPage;
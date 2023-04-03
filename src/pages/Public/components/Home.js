import { Welcome } from "./Welcome";
import { Auth } from "./Auth";

export const Home = () => {
  return (
    <main className="public-homepage">
      <Welcome />
      <Auth />
    </main>
  );
};

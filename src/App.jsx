import React from "react";

import Home from "./Components/Home";
import Characters from "./Components/Characters";
import Items from "./Components/Items";
import Misc from "./Components/Misc";
import Navbar from "./Components/Navbar";
import Places from "./Components/Places";
import CreateCharacter from "./Create/CreateCharacter";
import CreateItem from "./Create/CreateItem";
import CreateMisc from "./Create/CreateMisc";
import CreatePlace from "./Create/CreatePlace";
import EditCharacter from "./Edit/EditCharacter";
import EditItem from "./Edit/EditItem";
import EditMisc from "./Edit/EditMisc";
import EditPlace from "./Edit/EditPlace";
import { Route, Routes, useParams } from "react-router-dom";

function App() {
  const { name } = useParams();
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/items" element={<Items />} />
          <Route path="/places" element={<Places />} />
          <Route path="/misc" element={<Misc />} />
          <Route path="/createcharacter" element={<CreateCharacter />} />
          <Route path="/createitem" element={<CreateItem />} />
          <Route path="/createmisc" element={<CreateMisc />} />
          <Route path="/createplace" element={<CreatePlace />} />
          <Route path="/editcharacter/" element={<EditCharacter />} />
          <Route path="/editcharacter/:name" element={<EditCharacter />} />
          <Route path="/edititem/" element={<EditItem />} />
          <Route path="/edititem/:name" element={<EditItem />} />
          <Route path="/editmisc/" element={<EditMisc />} />
          <Route path="/editmisc/:name" element={<EditMisc />} />
          <Route path="/editplace/" element={<EditPlace />} />
          <Route path="/editplace/:name" element={<EditPlace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

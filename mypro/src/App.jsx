// App.js
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Supers from "./Components/Supers";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const supabase = createClient(
  /// supabase url
  "https://cpjfjiqxbohvkhpzrkuv.supabase.co",
  //// api key of supabase
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwamZqaXF4Ym9odmtocHpya3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5MDAyOTIsImV4cCI6MjAyNTQ3NjI5Mn0.zTK0rGuSarMXspWQy1fQf1H4DYdvIltw2dJ3uijlcpI"
);

function App() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        
<Supers supabase={supabase} />
      </SignedIn>
    </header>
  );
}

export default App;

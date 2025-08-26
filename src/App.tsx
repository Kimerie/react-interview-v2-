import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { Button } from "./components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./components/ui/card";
import {
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
} from "@heroicons/react/16/solid";
import "./App.css";

const API_KEY = "";

const response = {
  copyright: "\nAndrea Girones\n",
  date: "2025-08-26",
  explanation:
    "What's hovering above the Sun?  A solar prominence. A prominence is a crest of hot gas expelled from the Sun's surface that is held aloft by the Sun's magnetic field.  Prominences can last for days, can suddenly explode into space, or just fall back to the Sun.  What decides a prominence's fate is how the Sun's complex magnetic field changes -- the field's direction can act like an offramp for trapped solar particles. The 3-second (repeating) time-lapse featured video was captured earlier this month from Ottawa, Ontario, Canada. It shows the development of a larger-than-Earth prominence as it appears to leak solar plasma back to the Sun, over the course of an hour. What is unusual is that the prominence appears to hover -- more simple and typical prominences form magnetic loops that connect back to the surface.  Many hours after this video ended, the hovering prominence disintegrated back into the Sun.    Explore the Universe: Random APOD Generator",
  media_type: "other",
  service_version: "v1",
  title: "A Leaky Solar Prominence",
  url: "https://api.nasa.gov/assets/img/general/apod.jpg",
};

function App() {
  const [currentDate, setCurrentDate] = useState(DateTime.now());
  const [today, setToday] = useState(DateTime.now());
  const [currentImage, setCurrentImage] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchNasaApod = async () => {
      setLoading(true);
      try {
        if (!response) {
          throw error;
        }
        // const response = await fetch(
        //   `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${currentdate.year}-${currentdate.month}-${currentdate.day}`
        // );
        let image = response;
        setCurrentImage(image);
      } catch (e) {
        setError("There was an error. Please try again.");
        console.error(`There was an error: ${e}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNasaApod();
  }, [currentDate]);

  const handlePastClick = () => {
    if (loading) return;
    const past = currentDate.minus({ days: 1 });
    setCurrentDate(past);
  };

  const handleFutureClick = () => {
    if (loading) return;
    const future = currentDate.plus({ days: 1 });
    setCurrentDate(future);
  };

  const canGoForward = () => {
    const todayStart = today.startOf("day");
    const currentStart = currentDate.startOf("day");
    return currentStart < todayStart;
  };

  return (
    <>
      <div className="container flex justify-center mx-auto min-h-screen p-8">
        <div className="relative max-w-xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>NASA Picture of Day</CardTitle>

              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={handlePastClick}
                  className="bg-black text-white w-2 h-2 items-center"
                >
                  <ChevronLeftIcon />
                </Button>

                <span>{`${currentDate.year}-${currentDate.month}-${currentDate.day}`}</span>

                <Button
                  onClick={handleFutureClick}
                  disabled={!canGoForward()}
                  className="bg-black text-white w-2 h-2"
                >
                  <ChevronRightIcon />
                </Button>
              </div>

              {currentImage.title && !loading && <h3>{currentImage.title}</h3>}
            </CardHeader>
            {!currentImage && loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {currentImage.url && !loading && (
              <CardContent className="p-6">
                <img src={currentImage.url} width={500} />
                <CardDescription className="py-2">
                  {currentImage.explanation}
                </CardDescription>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;

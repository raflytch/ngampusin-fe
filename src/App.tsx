import { JSX, useState } from "react";
import { Button } from "./components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./components/ui/alert-dialog";

const App = (): JSX.Element => {
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const handleClick = (): void => {
    setIsAlertOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl">Hello</h1>
      <p>This is a simple React application.</p>
      <Button variant="default" onClick={handleClick}>
        Click Me
      </Button>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Halo</AlertDialogTitle>
            <AlertDialogDescription>
              Selamat datang di aplikasi React!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default App;

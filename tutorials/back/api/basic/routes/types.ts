interface Drink {
import { Pizza, NewPizza, PizzaToUpdate } from "../types";

    id: number;
    title: string;
    image: string;
    volume: number;
    price: number;
  }
  
  export type { Pizza, NewPizza, PizzaToUpdate, Drink };
  
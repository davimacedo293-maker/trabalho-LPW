import { type Application, Stage, level } from "melonjs";

class PlayScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
    level.load("map1");
}
}

export default PlayScreen;

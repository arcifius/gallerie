import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import 'jest-canvas-mock';

configure({ adapter: new Adapter() });

// TODO: mock navigator.mediaDevices to test stream catch from camera
const mockMediaDevices = {
  getUserMedia: jest.fn(
    Promise.resolve({
      active: false,
      id: "0e484e42-aa55-4803-a2ae-0e901b5b2a0a",
      onactive: null,
      onaddtrack: null,
      oninactive: null,
      onremovetrack: null
    })
  )
};
global.navigator.mediaDevices = mockMediaDevices;

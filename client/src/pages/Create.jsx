import { Box, Button, Center, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { useState } from "react";

export default function Create() {
    const [eventDateStart, setEventDateStart] = useState("");
    const [eventDateEnd, setEventDateEnd] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const event = {
            eventDateStart,
            eventDateEnd,
            title,
            description,
            address: {
                street,
                city,
                state,
                zip
            }
        };
        console.log(event);
        console.log(JSON.stringify(event))
    };

    return (
        <Center>
            <Box w="50vw">
                <form onSubmit={handleSubmit}>
                    <FormControl id="eventDateStart">
                        <FormLabel>Event Start Date</FormLabel>
                        <Input type="datetime-local" value={eventDateStart} onChange={(e) => setEventDateStart(e.target.value)} />
                    </FormControl>
                    <FormControl id="eventDateEnd">
                        <FormLabel>Event End Date</FormLabel>
                        <Input type="datetime-local" value={eventDateEnd} onChange={(e) => setEventDateEnd(e.target.value)} />
                    </FormControl>
                    <FormControl id="title">
                        <FormLabel>Title</FormLabel>
                        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </FormControl>
                    <FormControl id="description">
                        <FormLabel>Description</FormLabel>
                        <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </FormControl>
                    <FormControl id="image">
                        <FormLabel>Image</FormLabel>
                        <Input type="file" />
                    </FormControl>
                    <FormControl id="street">
                        <FormLabel>Street</FormLabel>
                        <Input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
                    </FormControl>
                    <FormControl id="city">
                        <FormLabel>City</FormLabel>
                        <Input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                    </FormControl>
                    <FormControl id="state">
                        <FormLabel>State</FormLabel>
                        <Select placeholder="Select state" value={state} onChange={(e) => setState(e.target.value)}>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </Select>
                    </FormControl>
                    <FormControl id="zip">
                        <FormLabel>Zip</FormLabel>
                        <Input type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
                    </FormControl>
                    <Center>
                        <Button mt={4} onClick={handleSubmit} colorScheme="teal" type="submit">
                            Submit
                        </Button>
                    </Center>
                </form>
            </Box>
        </Center>
    );
}
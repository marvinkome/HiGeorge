import React, { useState } from "react";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { Button, Input, Icon, Text } from "react-native-elements";
import { IntervalPicker } from "./IntervalPicker";
import { colorTheme } from "styles/theme";
import { fonts } from "styles/fonts";
import { AllDays, Day, Time } from "store";
import dayjs from "dayjs";

type AddHabitViewProps = {
    text: string;
    interval: Day[];
    time: Date;
    setInterval: (day: Day[]) => void;
    changeText: (text: string) => void;
    setTime: (time: Date) => void;
    addHabit: () => void;
};
function AddHabitView(props: AddHabitViewProps) {
    const [isInputModalVisible, setInputModalVisible] = useState(false);
    const [isIntervalModalVisible, setIntervalModalVisible] = useState(false);
    const [showingTimePicker, showTimePicker] = useState(false);

    const toggleInputModal = () => {
        setInputModalVisible(!isInputModalVisible);
    };

    const toggleIntervalModal = () => {
        if (isInputModalVisible) {
            setInputModalVisible(false);
        }

        setIntervalModalVisible(!isIntervalModalVisible);

        if (!isInputModalVisible) {
            setInputModalVisible(true);
        }
    };

    return (
        <>
            <Button
                containerStyle={styles.addHabitButton}
                buttonStyle={{ width: "70%" }}
                icon={{ name: "plus", type: "feather" }}
                title="Add a habit"
                onPress={toggleInputModal}
            />

            {/* input */}
            <Modal
                isVisible={isInputModalVisible}
                onBackdropPress={toggleInputModal}
                onBackButtonPress={toggleInputModal}
                style={styles.modal}
            >
                <View style={styles.modalContainer}>
                    {/* input */}
                    <Input
                        placeholder="e.g. Exercise every morning"
                        keyboardType="default"
                        returnKeyType="done"
                        multiline={true}
                        blurOnSubmit={true}
                        value={props.text}
                        onChangeText={props.changeText}
                        selectionColor={colorTheme.primary}
                        inputContainerStyle={styles.inputContainer}
                    />

                    {/* options */}
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity onPress={toggleIntervalModal}>
                            <View style={styles.options}>
                                <Icon
                                    name="calendar"
                                    type="feather"
                                    size={15}
                                    color={colorTheme.green}
                                />
                                <Text style={styles.optionText}>
                                    {props.interval.length === 7 ? "Everyday" : "Custom"}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => showTimePicker(true)}>
                            <View style={styles.options}>
                                <Icon name="alarm" size={15} color={colorTheme.red} />
                                <Text style={styles.optionText}>
                                    {dayjs(props.time).format("h:mm A")}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <Icon
                            name="send"
                            type="ionicons"
                            size={30}
                            containerStyle={{ flex: 1, alignItems: "flex-end" }}
                            onPress={() => {
                                props.addHabit();
                                toggleInputModal();
                            }}
                        />
                    </View>
                </View>
            </Modal>

            {/* interval picker */}
            <Modal
                isVisible={isIntervalModalVisible}
                onBackdropPress={toggleIntervalModal}
                onBackButtonPress={toggleIntervalModal}
                style={styles.modal}
            >
                <IntervalPicker
                    selectedDays={props.interval}
                    setSelectedDays={props.setInterval}
                    toggleModal={toggleIntervalModal}
                />
            </Modal>

            {showingTimePicker && (
                <DateTimePicker
                    value={props.time}
                    mode="time"
                    onChange={(_, time) => {
                        showTimePicker(false);
                        time && props.setTime(time);
                    }}
                    onTouchCancel={() => showTimePicker(false)}
                />
            )}
        </>
    );
}

export function AddHabit(props: {
    addHabit: (data: { title: string; reminder: Time; interval: Day[] }) => void;
}) {
    const [text, setText] = useState("");
    const [interval, setInterval] = useState<Day[]>(AllDays);
    const [time, setTime] = useState(new Date());

    const validateForm = () => {
        if (!text.trim().length) {
            Alert.alert("Error", "Please write your habit");
            return false;
        }

        if (!interval.length) {
            Alert.alert("Error", "Please select the days you want to do this habit");
            return false;
        }

        if (!time) {
            Alert.alert("Error", "Please select the time you check-in on this habit");
            return false;
        }

        return true;
    };

    const addHabit = () => {
        if (!validateForm()) {
            return;
        }

        props.addHabit({
            title: text.trim(),
            interval: interval,
            reminder: {
                hour: time.getHours(),
                minute: time.getMinutes(),
            },
        });

        setText("");
        setInterval(AllDays);
        setTime(new Date());
    };

    return (
        <AddHabitView
            text={text}
            interval={interval}
            time={time}
            changeText={(t) => setText(t)}
            setInterval={(days) => setInterval(days)}
            setTime={(t) => setTime(t)}
            addHabit={addHabit}
        />
    );
}

const styles = StyleSheet.create({
    addHabitButton: {
        marginTop: 20,
        alignItems: "center",
    },

    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },

    modalContainer: {
        backgroundColor: colorTheme.background,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingVertical: 5,
    },

    inputContainer: {
        borderBottomWidth: 0,
    },

    optionsContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingBottom: 20,
    },

    options: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colorTheme.grey2,
        paddingVertical: 7,
        paddingHorizontal: 10,
    },

    optionText: {
        fontSize: 14,
        marginLeft: 5,
    },

    intervalPicker: {
        paddingHorizontal: 15,
        paddingBottom: 15,
        paddingVertical: 20,
    },

    intervalPickerEverydayOption: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 25,
    },

    intervalPickerEverydayOptionText: {
        ...fonts.semiBold,
    },

    intervalDayPicker: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    intervalDay: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: colorTheme.grey2,
        borderWidth: 1,

        alignItems: "center",
        justifyContent: "center",
    },

    intervalDayText: {
        // color: colorTheme.white,
    },

    intervalDoneText: {
        ...fonts.semiBold,
        color: colorTheme.primary,
        marginTop: 25,
    },
});

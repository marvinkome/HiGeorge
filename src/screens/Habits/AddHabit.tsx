import React, { useState } from "react";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Input, Icon, Text } from "react-native-elements";
import { IntervalPicker } from "./IntervalPicker";
import { colorTheme } from "styles/theme";
import { fonts } from "styles/fonts";

export function AddHabit() {
    const [isInputModalVisible, setInputModalVisible] = useState(true);
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
                                <Text style={styles.optionText}>Daily</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => showTimePicker(true)}>
                            <View style={styles.options}>
                                <Icon name="alarm" size={15} color={colorTheme.red} />
                                <Text style={styles.optionText}>9:00 AM</Text>
                            </View>
                        </TouchableOpacity>

                        <Icon
                            name="send"
                            type="ionicons"
                            size={30}
                            containerStyle={{ flex: 1, alignItems: "flex-end" }}
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
                <IntervalPicker toggleModal={toggleIntervalModal} />
            </Modal>

            {showingTimePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                    onChange={() => showTimePicker(false)}
                    onTouchCancel={() => showTimePicker(false)}
                />
            )}
        </>
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

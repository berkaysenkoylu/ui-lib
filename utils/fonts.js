import { Colors } from './colors';

const OpenSansBold = 'OpenSans-Bold';
const RobotoBold = 'Roboto-Bold';
const RobotoRegular = 'Roboto-Regular';

export const Fonts = {
    h1CenterOrangeredBold: {
        fontFamily: RobotoBold,
        fontSize: 96,
        fontStyle: 'normal',
        lineHeight: 120,
        letterSpacing: -1.5,
        textAlign: 'center',
        color: Colors.orangered
    },
    bodyCenterOrangeredRegular: {
        fontFamily: OpenSansBold,
        fontSize: 16,
        fontStyle: 'normal',
        lineHeight: 16,
        letterSpacing: 1,
        color: Colors.orangered
    }
};
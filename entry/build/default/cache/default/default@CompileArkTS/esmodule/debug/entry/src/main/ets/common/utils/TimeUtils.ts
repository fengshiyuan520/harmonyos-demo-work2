import { CommonConstants } from "@bundle:com.example.AVPlayerLongVideo/entry/ets/common/constants/CommonConstants";
export class TimeUtil {
    static secondToTime(seconds: number): string {
        let hourUnit = CommonConstants.HOUR_UNIT * CommonConstants.HOUR_UNIT;
        let hour: number = Math.floor(seconds / hourUnit);
        let minute: number = Math.floor((seconds - hour * hourUnit) / CommonConstants.HOUR_UNIT);
        let second: number = seconds - hour * hourUnit - minute * CommonConstants.HOUR_UNIT;
        let hourStr: string = hour < CommonConstants.TIME_CONST_TEN ? `0${hour.toString()}` : `${hour.toString()}`;
        let minuteStr: string = minute < CommonConstants.TIME_CONST_TEN ? `0${minute.toString()}` : `${minute.toString()}`;
        let secondStr: string = second < CommonConstants.TIME_CONST_TEN ? `0${second.toString()}` : `${second.toString()}`;
        if (hour > 0) {
            return `${hourStr}:${minuteStr}:${secondStr}`;
        }
        if (minute > 0) {
            return `${minuteStr}:${secondStr}`;
        }
        else {
            return `00:${secondStr}`;
        }
    }
    static millisecondsToTime(milliseconds: number): string {
        let hourUnit = CommonConstants.HOUR_UNIT * CommonConstants.HOUR_UNIT * CommonConstants.SECOND_TO_MS;
        let minuteUnit = CommonConstants.HOUR_UNIT * CommonConstants.SECOND_TO_MS;
        let secondUnit = CommonConstants.SECOND_TO_MS;
        let hour: number = Math.floor(milliseconds / hourUnit);
        let minute: number = Math.floor((milliseconds - hour * hourUnit) / minuteUnit);
        let second: number = Math.floor((milliseconds - hour * hourUnit - minute * minuteUnit) / secondUnit);
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString()
            .padStart(2, '0')}`;
    }
}

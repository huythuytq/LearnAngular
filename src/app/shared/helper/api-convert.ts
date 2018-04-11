import { Injectable } from '@angular/core/';
import * as moment from 'moment';
import { DashboardModel } from '../models/dashboard-model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ApiConvert {
    date_format = 'DD/MM/YYYY';
    datetime_format = 'DD/MM/YYYY hh:mm A';
    private userNameSub = new Subject<string>(); // thằng 1
    userName$ = this.userNameSub.asObservable(); // thằng 2, ở oninit của header, gọi subscribe của thằng 2, khi login xong, gọi thằng 1 đổi tên
    // hh = giờ 12
    // HH = giờ 24

    setUserName(name) {
        this.userNameSub.next(name); // đây là thằng 1, khi thằng 1 dc gọi, subscribe thằng 2 sẽ dc thực hiện
    }

    dateToTimestamp(data: string): number {
        return Number.parseInt(moment(data, this.date_format).format('x'));

        // format X = second
        // format x = milisecond
    }

    timestampToDate(data: any): string {
        return moment(data).format(this.date_format);
    }

    timestampToDatetime(data: number): string {
        return moment(data).format(this.datetime_format);
    }

    dashboarModelConvert(data: any[]): DashboardModel[] {
        const arr = [];
        data.forEach(e => {
            const result = new DashboardModel();
            result.code = e.number;
            result.thoiGianKham = this.timestampToDate(e.visitOrderDate).toString();
            arr.push(result);
        });
        return arr;
    }
}

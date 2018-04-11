export class DashboardModel {
    code: string;
    thoiGianKham: string;
}


class Nguoi {
    name: string;
    age: number;
    birtYear: number;

    getAge() {
        return this.birtYear - this.age;
    }
}

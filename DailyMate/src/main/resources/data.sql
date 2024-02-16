/* SQL 작성용 */

INSERT INTO ACCOUNT (ACCOUNT_ID, USER_ID, AMOUNT, CATEGORY, CONTENT, CREATED_AT, DATE, TYPE, DELETED_AT)
VALUES (100, 9539, 1000000, null, '월급이 들어왔당 히히', '2024-01-25 23:25:59', '2024-01-15', '수입', null),
       (101, 9539, -33000, '식비', '월급 들어온 기념으로 짜장면 먹음', '2024-01-25 23:27:00', '2024-01-15', '지출', null),
       (102, 9539, -4500, '식비', '후식으로 탕후루', '2024-01-25 23:29:00', '2024-01-15', '지출', null),
       (103, 9539, 500, null, '내 전재산', '2024-01-01 23:59:59', '2024-01-01', '수입', null),
       (104, 9539, -20000, '교통', '지각해서 택시탐', '2024-01-28 20:38:55', '2024-01-16', '지출', null),
       (105, 9539, -400000, '생활', '관리비', '2024-01-01 00:00:00', '2024-01-01', '지출', '2024-01-02 00:00:00'),
       (200, 1004, 500000, null, '한달 용돈', '2023-01-01 00:00:00', '2023-01-01', '수입', null),
       (201, 1004, -5000, '기타', '로또 구매', '2023-01-01 10:00:00', '2023-01-01', '지출', null),
       (202, 1004, -5000, '기타', '로또 구매', '2023-01-01 10:00:00', '2023-01-01', '지출', '2024-01-02 00:00:00'),
       (203, 1004, -2500, '카페', '아이스 아메리카노', '2023-01-03 10:00:00', '2023-01-03', '지출', null);

INSERT INTO USERS (USER_ID, EMAIL, PASSWORD, NICKNAME, TYPE)
VALUES (100, 'dd39@naver.com', '1234', '천재윤영', 'ROLE_USER'),
       (101, 'king@gmail.com', '1234', '관리자1', 'ROLE_ADMIN'),
       (102, 'test@naver.com', '{bcrypt}$2a$10$O4PtZTti4R48sqjQGyKD6exSAfKZWuYGzqAqC/zdj1ITlQ7DfY5ZS', '테스트1', 'ROLE_USER');


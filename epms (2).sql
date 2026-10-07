-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2026 at 03:49 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `epms`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `DepartmentCode` varchar(10) NOT NULL,
  `DepartmentName` varchar(50) DEFAULT NULL,
  `GrossSalary` decimal(10,2) DEFAULT NULL,
  `TotalDeduction` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`DepartmentCode`, `DepartmentName`, `GrossSalary`, `TotalDeduction`) VALUES
('ADMS', 'Adminstration Staff', 600000.00, 70000.00),
('CC', 'Check Control', 200000.00, 100000.00),
('CW', 'Carwash', 300000.00, 20000.00),
('EX', 'Exchange', 400000.00, 150000.00),
('MC', 'Mechanic', 450000.00, 40000.00),
('ST', 'Stock', 200000.00, 5000.00);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `EmployeeNumber` int(11) NOT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Position` varchar(50) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `Telephone` varchar(20) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `HiredDate` date DEFAULT NULL,
  `DepartmentCode` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`EmployeeNumber`, `FirstName`, `LastName`, `Position`, `Address`, `Telephone`, `Gender`, `HiredDate`, `DepartmentCode`) VALUES
(1, 'UBARUTA', 'Agnes', NULL, 'ubarutaagnes4@gmail.com', '0793535242', 'Female', '2026-05-01', 'ADMS'),
(2, 'UWASE', 'Donatha', 'Ceo Manager', 'donatha@gmail.com', '0732513383', 'Female', '2026-05-02', 'ADMS'),
(3, 'MAHORO', 'Francoise', 'Mechanical Engineer', 'mahoro@123', '0786789000', 'Male', '2026-05-26', 'MC'),
(4, 'IRADUKUNDA', 'Marthe', 'Supervisor', 'anitha@gmail.com', '0789876543', 'Male', '2026-05-03', 'MC');

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

CREATE TABLE `salary` (
  `SalaryID` int(11) NOT NULL,
  `EmployeeNumber` int(11) DEFAULT NULL,
  `GrossSalary` decimal(10,2) DEFAULT NULL,
  `TotalDeduction` decimal(10,2) DEFAULT NULL,
  `NetSalary` decimal(10,2) DEFAULT NULL,
  `Month` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`SalaryID`, `EmployeeNumber`, `GrossSalary`, `TotalDeduction`, `NetSalary`, `Month`) VALUES
(1, 1, 600000.00, 70000.00, 530000.00, NULL),
(2, 1, 600000.00, 70000.00, 530000.00, NULL),
(3, 1, 600000.00, 70000.00, 530000.00, NULL),
(4, 1, 600000.00, 70000.00, 530000.00, NULL),
(5, 1, 600000.00, 70000.00, 530000.00, NULL),
(6, 1, 600000.00, 70000.00, 530000.00, '2026-05'),
(7, 4, 450000.00, 40000.00, 410000.00, '2026-01'),
(8, 1, 600000.00, 70000.00, 530000.00, '2026-01'),
(9, 2, 600000.00, 70000.00, 530000.00, '2026-02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`) VALUES
(1, 'Agnes', '$2b$10$cbKKRB4Bzh.yoB..nVFqUuoVa96fiA/L0KuXJpfsiNT7KnflXrgji', '2026-05-23 08:41:49'),
(2, 'Mahoro', '$2b$10$17PvZGxEsAG.xNt1rwf6lu7tZR56Ww.V2imUW75RUcg6MLjrWKKsa', '2026-05-23 08:48:27'),
(3, 'Uwase', '$2b$10$XoMa0U8Vu5GnMxauGo1Je.wwjsEGhhPn2XO2ru8tjx7qlNhH.9Lii', '2026-05-26 08:30:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`DepartmentCode`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`EmployeeNumber`),
  ADD KEY `DepartmentCode` (`DepartmentCode`);

--
-- Indexes for table `salary`
--
ALTER TABLE `salary`
  ADD PRIMARY KEY (`SalaryID`),
  ADD KEY `EmployeeNumber` (`EmployeeNumber`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `EmployeeNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `salary`
--
ALTER TABLE `salary`
  MODIFY `SalaryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`DepartmentCode`) REFERENCES `department` (`DepartmentCode`);

--
-- Constraints for table `salary`
--
ALTER TABLE `salary`
  ADD CONSTRAINT `salary_ibfk_1` FOREIGN KEY (`EmployeeNumber`) REFERENCES `employee` (`EmployeeNumber`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

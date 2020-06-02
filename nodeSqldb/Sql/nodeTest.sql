/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 50728
 Source Host           : localhost:3306
 Source Schema         : nodeTest

 Target Server Type    : MySQL
 Target Server Version : 50728
 File Encoding         : 65001

 Date: 02/06/2020 10:28:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_product
-- ----------------------------
DROP TABLE IF EXISTS `t_product`;
CREATE TABLE `t_product` (
  `pid` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '产品id',
  `p_name` varchar(100) NOT NULL COMMENT '产品名字',
  `p_price` varchar(100) NOT NULL COMMENT '产品价格',
  `p_type` varchar(100) NOT NULL COMMENT '产品类型',
  `p_img` varchar(100) NOT NULL COMMENT '产品图片',
  `p_des` varchar(100) NOT NULL COMMENT '产品描述',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_product
-- ----------------------------
BEGIN;
INSERT INTO `t_product` VALUES (2, '手机', '98', '2', 'https://ss0.bdstatic.com/', '美丽好用的的手机', '2020-06-01 16:44:02', '2020-06-01 16:44:02');
INSERT INTO `t_product` VALUES (3, '微波炉', '98', '2', 'https://ss0.bdstatic.com/', '美丽好用的的微波炉', '2020-06-01 16:44:59', '2020-06-01 16:44:59');
INSERT INTO `t_product` VALUES (4, '微波炉', '98', '2', 'https://ss0.bdstatic.com/', '美丽好用的的微波炉', '2020-06-01 16:45:37', '2020-06-01 16:45:37');
COMMIT;

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(100) NOT NULL COMMENT '用户名',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `phone` varchar(100) NOT NULL COMMENT '电话',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
BEGIN;
INSERT INTO `t_user` VALUES (1, 'zcx', '666666', '1378889488', '2020-06-01 16:19:48', '2020-06-01 16:19:48');
INSERT INTO `t_user` VALUES (2, 'zcx1', '666666', '1378889488', '2020-06-01 19:49:53', '2020-06-01 19:49:53');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

---
title: 'git常用命令'
sidebar: auto
collapsable: true
---

# git 常用命令总结

## 删除文件
git rm filename

## 比较文件修改前后的差异
如果文件修改了，还未提交，就可以比较文件修改前后的差异

git diff filename

## 查看日志
git log

## 版本回退
可以将当前的仓库回退到历史到某个版本

git reset

* 第一种用法：回退到上一版本（HEAD代表当前版本，有一个^代表上一个版本，以此类推）<br/>
git reset --hard HEAD^
* 第二种用法：回退到指定版本（其中d7b5是想回退到指定版本号的前几位）<br/>
git reset --hard d7b5

## 查看仓库的操作历史
git reflog

## 创建分支
* git checkout 分支名
* git checkout -b 分支名

## 标签
### 新建标签
* git tag 标签名 版本号
### 查看所有标签
* git show 标签名
### 推送所有tag
* git push origin --tags
### 推送某个tag
* git push origin v1.0

## git上的代码提交到别到分支
1. git add .
2. git stash
3. git checkout 要提交到分支
4. git stash pop

备注：如果当前分支已经commit了，需要：

git reset HEAD^

## 某次提交的转移到指定分支
git cherry-pick commitid

如果有冲突，解决冲突后git add . 然后 git cherry-pick --continue

最后push到指定分支

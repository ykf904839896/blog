import { Fragment, useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { FieldTimeOutlined, FileTextOutlined } from "@ant-design/icons";
import { Tag, Skeleton } from "antd";
import Icon from "@/components/Icon";
import style from "./index.module.scss";

/*
 @params data{object[]}:渲染的数据
 @params className:article{string}标签额外添加的类
*/
interface articleComponent {
  data: any[];
  className?: string;
}

export default function Article({ data, className }: articleComponent) {
  const articleData = useMemo(() => data, [data]); //文章数据
  const [lock, setLock] = useState<boolean>(false); //防止introduce被服务器渲染出来，让他在客户端渲染
  useEffect(() => {
    setLock(true);
  }, []);
  return (
    <Fragment>
      {articleData.map((item, index) => {
        return (
          // 动态接收一个className，参数为可选参数
          <article
            key={item.router}
            className={style.article + ` ${className || ""}`}
          >
            <h1 className={style.title}>
              <Link href={`/article/${item.router}`}>
                <a>{item.title}</a>
              </Link>
            </h1>
            <div className="types pc">
              {item.type.split(",").map((item: string, index) => {
                return (
                  <Link href={`/search/${item}`} key={item}>
                    <a>
                      <Tag color="blue">{item}</Tag>
                    </a>
                  </Link>
                );
              })}
            </div>
            <time>
              <Icon icon={<FieldTimeOutlined />} />
              {item.time.substring(0, 10)}
            </time>
            {lock ? (
              <div className={style.introduce}>{item.introduce}</div>
            ) : (
              ""
            )}
            <div className={style.article_footer}>
              <div className={style.article_link}>
                <Icon icon={<FileTextOutlined />} />
                <Link href={`/article/${item.router}`}>
                  <a>查看文章&gt;</a>
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </Fragment>
  );
}
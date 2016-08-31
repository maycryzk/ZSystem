package com.system.base.dao;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.hibernate.HibernateException;

public interface BaseDao {
	/**
	 * 使用sql语句获取获得单行实体数据
	 * @param sql sql语句
	 * @return 单行数据Object组数，当只有�?��时，为Object。查不到或查到多条则返加null
	 */
	public Object getSqlEntity(String sql,String className);
	/**
	 * 根据表名获取类名
	 * @param tableName
	 * @return
	 */
	public String getClassName(String tableName);

	/**
	 * 用于通过主键值查询实体对�?
	 * @param clazz 实体对象Class
	 * @param id 主键�?
	 * @return 查到的实体对象�?没有则返回null
	 */
	public Object get(Class clazz,Serializable id);
	
	
	/**
	 * 获取单个对象
	 * @param hql hql查询语句 (from User where name='tom')
	 * @return 查询的实体对象�?没有或查到多条则返回null
	 */
	public Object getOne(String hql);
	
	/**
	 * 获取单个对象
	 * @param hql hql查询语句 (from User where name='tom')
	 * @param args 查询参数
	 * @return 查询的实体对象�?没有或查到多条则返回null
	 */
	public Object getOne(String hql, Object[] args);
	
	/**
	 * 使用sql语句获取获得单行数据
	 * @param sql sql语句
	 * @return 单行数据Object组数，当只有�?��时，为Object。查不到或查到多条则返加null
	 */
	public Object getSqlObject(String sql);
	
	/**
	 * 使用sql语句获取获得单行数据
	 * @param sql sql语句
	 * @param args 查询参数
	 * @return 单行数据Object组数，当只有�?��时，为Object。查不到或查到多条则返加null
	 */
	public Object getSqlObject(String sql, Object[] args);

	
	
	/**
	 * 用于查询�?��指定的记�?用于分页的记�?br>
	 * @param hql hql查询语句
	 * @param pageSize 分页大小
	 * @param currentPage 第几�?
	 * @return �?��询对象集�?
	 */
	public List list(final String hql,final int pageSize,final int currentPage);
	
	/**
	 * hql分页获得对象列表
	 * @param hql hql查询语句 (from User where name=? and sex=?)
	 * @param pagesize 分页大小
	 * @param currpage 第几�?
	 * @param args 查询参数
	 * @return 对象列表
	 */
	public List list(final String hql,final int pagesize,final int currpage,final Object[] args);
	
	
	/**
	 * 用于查询�?��指定的记�?
	 * @param hql hql查询语句
	 * @return �?��询对象集�?
	 */
	public List list(final String hql);
	
	/**
	 * 用于查询�?��指定的记�?
	 * @param hql hql查询语句
	 * @param args 查询参数
	 * @return �?��询对象集�?
	 */
	public List list(String hql, Object[] args);

	
	
	/**
	 * 用于查询总记录的个数<br>
	 * 不需�?加select count(*) 
	 * @param hql hql查询语句
	 * @return 记录的个�?
	 */
	public int getCount(final String hql);
	
	/**
	 * hql获得对象条数
	 * @param HQL hql查询语句 (from User where name=? and sex=?)
	 * @param args 查询参数
	 * @return 对象条数
	 */
	public int getCount(final String HQL,final Object[] args);
	

	/**
	 * 使用sql语句查询数据集合
	 * @param sql sql查询语句
	 * @return 数据集合。Object数组列表，当只有�?��时，为List&lt;Object[]&gt;,不少于一列，为List&lt;Object[][]&gt;
	 */
	public List getSqlList(String sql);
	
	
	/**
	 * 使用sql语句查询数据集合
	 * @param sql sql查询语句
	 * @param args 查询参数
	 * @return 数据集合。Object数组列表，当只有�?��时，为List<Object[]>,不少于一列，为List<Object[][]>
	 */
	public List getSqlList(String sql, Object[] args);
	
	
	/**
	 * 使用sql语句查询数据集合,用于分页查询
	 * @param sql sql查询语句
	 * @param pageSize 分页大小
	 * @param currentPage 第几�?
	 * @return 数据集合。Object数组列表，当只有�?��时，为List<Object[]>,不少于一列，为List<Object[][]>
	 */
	public List getSqlList(String sql, int pagesize, int currpage);

	
	/**
	 * 使用sql语句查询数据集合,用于分页查询
	 * @param sql sql查询语句
	 * @param pageSize 分页大小
	 * @param currentPage 第几�?
	 * @param args 查询参数
	 * @return 数据集合。Object数组列表，当只有�?��时，为List<Object[]>,不少于一列，为List<Object[][]>
	 */
	public List getSqlList(String sql, int pagesize, int currpage, Object[] args);
	
	/**
	 * 使用sql语句查询数据集合,用于分页查询
	 * @param sql sql查询语句
	 * @param pageSize 分页大小
	 * @param currentPage 第几�?
	 * @param args 查询参数
	 * @param addScalar 用于查询单列数据别名
	 * @return 数据集合。Object数组列表，当只有�?��时，为List<Object[]>,不少于一列，为List<Object[][]>
	 */
	public List getSqlList(String sql, int pagesize, int currpage, Object[] args,String addScalar);
	
	
	/**
	 * 使用sql语句查询数据集合
	 * @param sql sql查询语句
	 * @return 数据集合。map列表
	 */
	public List<Map<String, Object>> getSqlMapList(String sql);
	
	
	/**
	 * 使用sql语句查询数据集合
	 * @param sql sql查询语句
	 * @param args 查询参数
	 * @return 数据集合。map列表
	 */
	public List<Map<String, Object>> getSqlMapList(String sql, Object[] args);
	
	
	/**
	 * 使用sql语句查询数据集合,用于分页查询
	 * @param sql sql查询语句
	 * @param pageSize 分页大小
	 * @param currentPage 第几�?
	 * @param args 查询参数
	 * @return 数据集合。Map列表
	 */
	public List<Map<String, Object>> getSqlMapList(String sql, int pagesize, int currpage, Object[] args);
	
	
	/**
	 * 使用sql语句获取获得单行数据
	 * @param sql sql语句
	 * @return 单行数据Map
	 */
	public Map<String, Object> getSqlMap(String sql);
	
	
	/**
	 * 使用sql语句获取获得单行数据
	 * @param sql sql语句
	 * @param args 查询参数
	 * @return
	 */
	public Map<String, Object> getSqlMap(String sql, Object[] args);
	
	
	
	/**
	 * 获取sql语句记录数量<br>
	 * 不用�?select count(*)
	 * @param sql sql查询语句
	 * @return 记录条数
	 */
	public int getSqlCount(String sql);
	
	
	/**
	 * 获取sql语句记录数量<br>
	 * 不用�?select count(*)
	 * @param sql sql查询语句
	 * @param args 查询参数
	 * @return 记录条数
	 */
	public int getSqlCount(String sql, Object[] args);
	
	
	/**
	 * 创建ID 
	 * @param prefix 前缀
	 * @return �?��建ID
	 */
	public String createSeqid(String prefix);
	
	
	/**
	 * 保存或�?候修改实体对�?
	 * @param object 要保存或者�?修改实体对象
	 */
	public void saveOrUpdate(Object object);
	
	/**
	 * 保存实体对象
	 * @param object 要保存实体对�?
	 * @return 返回保存后的对象ID
	 */
	public Serializable save(Object object);
	

	/**
	 * 删除实体对象
	 * @param clazz 要删除实体对象class
	 * @param id 要删除实体对象iD
	 */
	public void delete(Class clazz,Serializable id) ;
	
	/**
	 * 删除实体对象
	 * @param object 要删除实体对�?
	 */
	public void delete(Object object) ;
	
	
	/**
	 * 批量删除 
	 * @param tableName 数据库表�?
	 * @param columName 数据库表主键对应的列�?
	 * @param ids 主键数组
	 * @return 执行结果数组
	 * @exception 当有�?��数据删除出错，就会抛出异�?
	 */
	public int[] deletes(String tableName,String columName,Serializable[] ids) throws Exception ;
	
	/**
	 * 批量添加<br>
	 * @param sql sql插入语句
	 * @param params 参数数组
	 * @return 执行结果数组
	 */
	public int[] inserts(String sql,Object[][] params);
	
	
	/**
	 * 批量添加
	 * @param objects 要添加的实体对象
	 */
	public void inserts(Object[] objects);
	
	
	/**
	 * 执行sql语句增删�?
	 * @param sql sql语句
	 * @return 执行结果
	 */
	public int executeSql(String sql);
	
	
	/**
	 * 执行sql语句增删�?
	 * @param sql sql语句
	 * @param args 参数
	 * @return 执行结果
	 */
	public int executeSql(String sql, Object[] args);

	/**
	 * 用于批量添加时的监听 void inserts(Object[] objects)
	 * @param insertListener 批量添加前后监听�?
	 */
	public void addInsertListener(InsertListener insertListener);
	
	/**
	 * 移除批量添加前后监听�?
	 */
	public void removeInsertListener();
	
	/**
	 * 批量添加前后监听�?br>
	 * 可以在持久化对象之前或之后添加一些操作�?
	 * 修改历史[修改说明][修改人][修改时间]�?
	 * 
	 * @author 李洋 
	 * @version 1.0 2013-07-29
	 */
	public interface InsertListener{
		/**
		 * 对象持久化之�?
		 */
		public final static int ACTION_BEFORE=0;
		/**
		 * 对象持久化之�?
		 */
		public final static int ACTION_AFTER=1;
		
		/**
		 * 对象持久化之前，之后添加操作<br>
		 * 如果添加不成功，则对应的只有之前的回调，没有之后的回�?
		 * @param action 之前或之�?InsertListener.ACTION_BEFORE，InsertListener.ACTION_AFTER
		 * @param object 要持久化的对�?
		 * @return 处理后的对象
		 */
		public Object onInsert(int action,Object object);
	}

	public List getSqlColumns(String sql) throws HibernateException, SQLException;

	
	/** 
	 * 获取�?���?
	 * @param hql
	 * @return 
	 */ 
	public Integer getMaxValue(String hql) ;

}

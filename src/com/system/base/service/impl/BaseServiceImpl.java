package com.system.base.service.impl;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;


import org.hibernate.HibernateException;

import com.system.base.dao.BaseDao;
import com.system.base.dao.BaseDao.InsertListener;
import com.system.base.service.BaseService;



public class BaseServiceImpl implements BaseService {
	
	private BaseDao baseDao;
	
	public BaseServiceImpl(){}
	
	/**
	 * 提供构�?函数注入
	 * @param baseDao 要注入的baseDao
	 */
	public BaseServiceImpl(BaseDao baseDao){
		this.baseDao=baseDao;
	}
	

	
	/**
	 * 移除批量添加前后监听�?
	 */
	@Override
	public void removeInsertListener() {
		baseDao.removeInsertListener();
	}

	/**
	 * 创建ID 
	 * @param prefix 前缀
	 * @return �?��建ID
	 */
	@Override
	public String createSeqid(String prefix) {
		return baseDao.createSeqid(prefix);
	}

	/**
	 * 删除实体对象
	 * @param clazz 要删除实体对象class
	 * @param id 要删除实体对象iD
	 */
	@Override
	public void delete(Class clazz,Serializable id)  {
		baseDao.delete(clazz, id);
	}
	
	/**
	 * 删除实体对象
	 * @param object 要删除实体对�?
	 */
	@Override
	public void delete(Object object)  {
		baseDao.delete(object);
	}

	/**
	 * 批量删除 
	 * @param tableName 数据库表�?
	 * @param columName 数据库表主键对应的列�?
	 * @param ids 主键数组
	 * @return 执行结果数组
	 * @exception 当有�?��数据删除出错，就会抛出异�?
	 */
	@Override
	public int[] deletes(String tableName, String columName, Serializable[] ids) throws Exception{
			
		return baseDao.deletes(tableName, columName, ids);
	}

	/**
	 * 执行sql语句增删�?
	 * @param sql sql语句
	 * @return 执行结果
	 */
	@Override
	public int executeSql(String sql) {
		return baseDao.executeSql(sql);
	}

	
	/**
	 * 执行sql语句增删�?
	 * @param sql sql语句
	 * @param args 参数
	 * @return 执行结果
	 */
	public int executeSql(String sql, Object[] args){
		System.out.println(this.baseDao);
		return baseDao.executeSql(sql, args);
	}
	
	
	/**
	 * 用于通过主键值查询实体对�?
	 * @param clazz 实体对象Class
	 * @param id 主键�?
	 * @return 查到的实体对象�?没有则返回null
	 */
	@Override
	public Object get(Class clazz, Serializable id) {
		// TODO Auto-generated method stub
		return baseDao.get(clazz, id);
	}

	/**
	 * 用于查询总记录的个数<br>
	 * 不需�?加select count(*) 
	 * @param hql hql查询语句
	 * @return 记录的个�?
	 */
	@Override
	public int getCount(String hql) {
		return baseDao.getCount(hql);
	}


	/**
	 * hql获得对象条数
	 * @param hql hql查询语句 (from User where name=? and sex=?)
	 * @param args 查询参数
	 * @return 对象条数
	 */
	@Override
	public int getCount(String hql, Object[] args) {
		return baseDao.getCount(hql, args);
	}


	/**
	 * hql分页获得对象列表
	 * @param hql hql查询语句 (from User where name=? and sex=?)
	 * @param pagesize 分页大小
	 * @param currpage 第几�?
	 * @param args 查询参数
	 * @return 对象列表
	 */
	@Override
	public List list(String hql, int pagesize, int currpage, Object[] args) {
		return baseDao.list(hql, pagesize, currpage, args);
	}

	/**
	 * 获取单个对象
	 * @param hql hql查询语句 (from User where name='tom')
	 * @return 查询的实体对象�?没有或查到多条则返回null
	 */
	@Override
	public Object getOne(String hql) {
		return baseDao.getOne(hql);
	}

	/**
	 * 获取sql语句记录数量<br>
	 * 不用�?select count(*)
	 * @param sql sql查询语句
	 * @return 记录条数
	 */
	@Override
	public int getSqlCount(String sql) {
		return baseDao.getSqlCount(sql);
	}

	/**
	 * 使用sql语句查询数据集合
	 * @param sql sql查询语句
	 * @return 数据集合。Object数组列表，当只有�?��时，为List<Object[]>,不少于一列，为List<Object[][]>
	 */
	@Override
	public List getSqlList(String sql) {
		// TODO Auto-generated method stub
		return baseDao.getSqlList(sql);
	}

	/**
	 * 使用sql语句获取获得单行数据
	 * @param sql sql语句
	 * @return 单行数据Object组数，当只有�?��时，为Object。查不到或查到多条则返加null
	 */
	@Override
	public Object getSqlObject(String sql) {
		return baseDao.getSqlObject(sql);
	}


	/**
	 * 批量添加<br>
	 * @param sql sql插入语句
	 * @param params 参数数组
	 * @return 执行结果数组
	 */
	@Override
	public int[] inserts(String sql, Object[][] params) {
		
		return baseDao.inserts(sql, params);
	}

	/**
	 * 批量添加
	 * @param objects 要添加的实体对象
	 */
	@Override
	public void inserts(Object[] objects) {
		baseDao.inserts(objects);
	}


	/**
	 * 用于查询�?��指定的记�?用于分页的记�?br>
	 * @param hql hql查询语句
	 * @param pageSize 分页大小
	 * @param currentPage 第几�?
	 * @return �?��询对象集�?
	 */
	@Override
	public List list(final String hql,final int pageSize, final int currentPage) {
		
		//返回list
		return baseDao.list(hql, pageSize, currentPage);
	}

	/**
	 * 用于查询�?��指定的记�?
	 * @param hql hql查询语句
	 * @return �?��询对象集�?
	 */
	@Override
	public List list(final String hql) {
		//返回list
		return baseDao.list(hql);
	}

	/**
	 * 保存实体对象
	 * @param object 要保存实体对�?
	 * @return 返回保存后的对象ID
	 */
	@Override
	public Serializable save(Object object) {
		return baseDao.save(object);
	}

	/**
	 * 保存或�?候修改实体对�?
	 * @param object 要保存或者�?修改实体对象
	 */
	@Override
	public void saveOrUpdate(Object object) {
		baseDao.saveOrUpdate(object);
	}

	/**
	 * 获取单个对象
	 * @param hql hql查询语句 (from User where name='tom')
	 * @param args 查询参数
	 * @return 查询的实体对象�?没有或查到多条则返回null
	 */
	@Override
	public Object getOne(String hql, Object[] args) {
		return baseDao.getOne(hql, args);
	}

	/**
	 * 获取sql语句记录数量<br>
	 * 不用�?select count(*)
	 * @param sql sql查询语句
	 * @param args 查询参数
	 * @return 记录条数
	 */
	@Override
	public int getSqlCount(String sql, Object[] args) {
		// TODO Auto-generated method stub
		return baseDao.getSqlCount(sql, args);
	}

	/**
	 * 使用sql语句查询数据集合
	 * @param sql sql查询语句
	 * @param args 查询参数
	 * @return 数据集合。Object数组列表，当只有�?��时，为List<Object[]>,不少于一列，为List<Object[][]>
	 */
	@Override
	public List getSqlList(String sql, Object[] args) {
		// TODO Auto-generated method stub
		return baseDao.getSqlList(sql, args);
	}

	/**
	 * 使用sql语句查询数据集合,用于分页查询
	 * @param sql sql查询语句
	 * @param pageSize 分页大小
	 * @param currentPage 第几�?
	 * @return 数据集合。Object数组列表，当只有�?��时，为List<Object[]>,不少于一列，为List<Object[][]>
	 */
	@Override
	public List getSqlList(String sql, int pagesize, int currpage) {
		// TODO Auto-generated method stub
		return baseDao.getSqlList(sql, pagesize, currpage);
	}
	
	/**
	 * 使用sql语句查询数据集合,用于分页查询
	 * @param sql sql查询语句
	 * @param pageSize 分页大小
	 * @param currentPage 第几�?
	 * @param args 查询参数
	 * @return 数据集合。Object数组列表，当只有�?��时，为List<Object[]>,不少于一列，为List<Object[][]>
	 */
	public List getSqlList(String sql, int pagesize, int currpage, Object[] args){
		return baseDao.getSqlList(sql, pagesize, currpage, args);
	}

	/**
	 * 使用sql语句查询数据集合,用于分页查询
	 * @param sql sql查询语句
	 * @param pageSize 分页大小
	 * @param currentPage 第几�?
	 * @param addScalar 用于查询单列数据别名
	 * @return 数据集合。Object数组列表，当只有�?��时，为List<Object[]>,不少于一列，为List<Object[][]>
	 */
	@Override
	public List getSqlList(String sql, int pagesize, int currpage, Object[] args,String addScalar) {
		// TODO Auto-generated method stub
		return baseDao.getSqlList(sql, pagesize, currpage, args,addScalar);
	}

	
	
	/**
	 * 使用sql语句查询数据集合
	 * @param sql sql查询语句
	 * @return 数据集合。map列表
	 */
	public List<Map<String, Object>> getSqlMapList(String sql){
		return baseDao.getSqlMapList(sql);
	}
	
	/**
	 * 使用sql语句查询数据集合
	 * @param sql sql查询语句
	 * @param args 查询参数
	 * @return 数据集合。map列表
	 */
	public List<Map<String, Object>> getSqlMapList(String sql, Object[] args){
		return baseDao.getSqlMapList(sql, args);
	}
	
	/**
	 * 使用sql语句查询数据集合,用于分页查询
	 * @param sql sql查询语句
	 * @param pageSize 分页大小
	 * @param currentPage 第几�?
	 * @param args 查询参数
	 * @return 数据集合。Map列表
	 */
	@Override
	public List<Map<String, Object>> getSqlMapList(String sql, int pagesize, int currpage, Object[] args){
		return baseDao.getSqlMapList(sql, pagesize, currpage, args);
	}
	
					
	/**
	 * 使用sql语句获取获得单行数据
	 * @param sql sql语句
	 * @return 单行数据Map
	 */
	@Override
	public Map<String, Object> getSqlMap(String sql){
		return baseDao.getSqlMap(sql);
	}
	
	
	
	/**
	 * 使用sql语句获取获得单行数据
	 * @param sql sql语句
	 * @param args 查询参数
	 * @return
	 */
	@Override
	public Map<String, Object> getSqlMap(String sql, Object[] args){
		return baseDao.getSqlMap(sql, args);
	}
	
	
	/**
	 * 使用sql语句获取获得单行数据
	 * @param sql sql语句
	 * @param args 查询参数
	 * @return 单行数据Object组数，当只有�?��时，为Object。查不到或查到多条则返加null
	 */
	@Override
	public Object getSqlObject(String sql, Object[] args) {
		// TODO Auto-generated method stub
		return baseDao.getSqlObject(sql, args);
	}

	/**
	 * 用于查询�?��指定的记�?
	 * @param hql hql查询语句
	 * @param args 查询参数
	 * @return �?��询对象集�?
	 */
	@Override
	public List list(String hql, Object[] args) {
		// TODO Auto-generated method stub
		return baseDao.list(hql, args);
	}

	@Override
	/**
	 * 使用sql语句获取获得单行实体数据
	 * @param sql sql语句
	 * @return 单行数据Object组数，当只有�?��时，为Object。查不到或查到多条则返加null
	 */
	public String getClassName(String tableName) {
		return baseDao.getClassName(tableName);
	}
	
	/**
	 * 根据表名获取类名
	 * @param tableName
	 * @return
	 */
	@Override
	public Object getSqlEntity(String sql, String className) {
		// TODO Auto-generated method stub
		return baseDao.getSqlEntity(sql, className);
	}

	@Override
	public List getSqlClos(String sql) throws HibernateException, SQLException {
		// TODO Auto-generated method stub
		return baseDao.getSqlColumns(sql);
	}
	
	/** 
	 * 获取最大值
	 * @param hql
	 * @return 
	 */  
	@Override
	public Integer getMaxValue(String hql) {
		return baseDao.getMaxValue(hql);
	}

	@Override
	public void addInsertListener(InsertListener insertListener) {
		baseDao.addInsertListener(insertListener);
	}


	

}
